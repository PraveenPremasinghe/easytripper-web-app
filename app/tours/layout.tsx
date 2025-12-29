import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours & Packages",
  description: "Discover our curated tour packages for exploring Sri Lanka - from cultural adventures to beach getaways",
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
