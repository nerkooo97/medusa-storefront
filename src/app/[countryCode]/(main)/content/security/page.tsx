import { redirect } from "next/navigation"

export default async function SecurityRedirect({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  redirect(`/${countryCode}/sigurnost`)
}
