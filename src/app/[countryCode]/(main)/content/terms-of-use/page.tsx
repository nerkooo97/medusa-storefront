import { redirect } from "next/navigation"

export default async function TermsRedirect({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  redirect(`/${countryCode}/uslovi-koristenja`)
}
