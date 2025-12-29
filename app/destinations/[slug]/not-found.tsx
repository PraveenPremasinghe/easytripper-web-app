import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Destination not found
      </p>
      <Button asChild>
        <Link href="/destinations">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Destinations
        </Link>
      </Button>
    </div>
  );
}

