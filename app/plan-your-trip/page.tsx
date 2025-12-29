import { TripPlanner } from "@/components/planner/TripPlanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description: "Create your custom Sri Lanka itinerary with our interactive trip planner.",
};

export default function PlanYourTripPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px]">
      <TripPlanner />
    </div>
  );
}
