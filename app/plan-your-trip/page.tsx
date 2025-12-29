import { TripPlanner } from "@/components/planner/TripPlanner";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description: "Create your custom Sri Lanka itinerary with our interactive trip planner.",
};

export default function PlanYourTripPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <JsonLd
        id="ld-breadcrumb-plan"
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Plan your trip", url: absoluteUrl("/plan-your-trip") },
        ])}
      />
      <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-6 lg:px-8">
        <TripPlanner />
      </div>
    </div>
  );
}
