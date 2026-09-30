import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"
import { renderLockedPageHtml } from "@lib/util/preview-lock"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "ba"

const STORE_PROTECTED = process.env.STORE_PROTECTED === "true"
const STORE_SECRET_TOKEN = process.env.STORE_SECRET_TOKEN || "piko2026"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    return regionMap
  }

  try {
    if (
      !regionMap.keys().next().value ||
      regionMapUpdated < Date.now() - 3600 * 1000
    ) {
      const response = await fetch(`${BACKEND_URL}/store/regions`, {
        method: "GET",
        headers: {
          ...(PUBLISHABLE_API_KEY ? { "x-publishable-api-key": PUBLISHABLE_API_KEY } : {}),
        },
        next: {
          revalidate: 3600,
          tags: [`regions-${cacheId}`],
        },
        cache: "force-cache",
      })

      if (!response.ok) {
        console.error(`Backend returned ${response.status} when fetching regions from ${BACKEND_URL}`)
        return regionMap
      }

      const json = await response.json()
      const { regions } = json

      if (!regions?.length) {
        return regionMap
      }

      regions.forEach((region: HttpTypes.StoreRegion) => {
        region.countries?.forEach((c) => {
          regionMapCache.regionMap.set(c.iso_2 ?? "", region)
        })
      })

      regionMapCache.regionMapUpdated = Date.now()
    }
  } catch (err) {
    console.error("Error in getRegionMap:", err)
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  let countryCode

  const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

  // Cloudflare Workers provides country via request.cf.country
  const cloudflareCountryCode = (request as { cf?: { country?: string } }).cf?.country?.toLowerCase()

  // Vercel provides x-vercel-ip-country header
  const vercelCountryCode = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase()

  if (urlCountryCode && regionMap.has(urlCountryCode)) {
    countryCode = urlCountryCode
  } else if (cloudflareCountryCode && regionMap.has(cloudflareCountryCode)) {
    countryCode = cloudflareCountryCode
  } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
    countryCode = vercelCountryCode
  } else if (regionMap.has(DEFAULT_REGION)) {
    countryCode = DEFAULT_REGION
  } else if (regionMap.keys().next().value) {
    countryCode = regionMap.keys().next().value
  }

  return countryCode
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  // Provjera tajnog linka za privatni pristup trgovini
  if (STORE_PROTECTED) {
    const secretCookie = request.cookies.get("piko_preview_access")?.value
    const querySecret =
      request.nextUrl.searchParams.get("preview") ||
      request.nextUrl.searchParams.get("secret") ||
      request.nextUrl.searchParams.get("token")

    // 1. Ako je unesen ispravan token preko query parametra (tajni link ili forma)
    if (querySecret && querySecret === STORE_SECRET_TOKEN) {
      const cleanUrl = request.nextUrl.clone()
      cleanUrl.searchParams.delete("preview")
      cleanUrl.searchParams.delete("secret")
      cleanUrl.searchParams.delete("token")

      const response = NextResponse.redirect(cleanUrl)
      response.cookies.set("piko_preview_access", STORE_SECRET_TOKEN, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dana
        httpOnly: true,
        sameSite: "lax",
      })
      return response
    }

    // 2. Ako korisnik već posjeduje validan cookie, puštamo ga
    const hasValidCookie = secretCookie === STORE_SECRET_TOKEN
    if (!hasValidCookie) {
      const hasError = Boolean(querySecret && querySecret !== STORE_SECRET_TOKEN)
      return new NextResponse(renderLockedPageHtml(hasError), {
        status: 403,
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      })
    }
  }

  const cacheIdCookie = request.cookies.get("_medusa_cache_id")
  const cacheId = cacheIdCookie?.value || crypto.randomUUID()

  const regionMap = await getRegionMap(cacheId)
  const countryCode = await getCountryCode(request, regionMap)

  // if the country code is available, use it, otherwise use the default region
  const country = countryCode || DEFAULT_REGION
  const firstPathSegment = request.nextUrl.pathname.split("/")[1]?.toLowerCase()
  const urlHasCountry = firstPathSegment === country.toLowerCase()

  if (urlHasCountry) {
    if (!cacheIdCookie) {
      const response = NextResponse.next()
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
      return response
    }
    return NextResponse.next()
  }

  // if the url doesn't have the country, redirect to it
  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
  const queryString = request.nextUrl.search || ""
  const redirectUrl = `${request.nextUrl.origin}/${country}${redirectPath}${queryString}`

  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
