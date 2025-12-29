export const siteConfig = {
  name: "Easy Tripper",
  description:
    "Private Sri Lanka tours for international travelers — custom itineraries, cultural experiences, wildlife safaris, and beach escapes with an expert local guide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk",
  locale: "en_US",
  email: "info@easytripper.lk",
  phone: "+94 77 123 4567",
  country: "Sri Lanka",
} as const;

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${safePath}`;
}

