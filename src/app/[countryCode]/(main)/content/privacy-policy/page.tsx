import { redirect } from "next/navigation"

export default async function PrivacyRedirect({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  redirect(`/${countryCode}/politika-privatnosti`)
}
