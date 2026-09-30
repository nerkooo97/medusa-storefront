import { redirect } from "next/navigation"

export default async function CustomerServiceRedirect({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  redirect(`/${countryCode}/cesta-pitanja`)
}
