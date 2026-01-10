"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Place } from "@/lib/places";
import { trackEvent } from "@/components/analytics/GoogleAnalytics";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { Spinner } from "@/components/ui/loader";
import { toast } from "@/components/ui/toaster";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SaveTripDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlaces: Place[];
}

export function SaveTripDialog({ isOpen, onClose, selectedPlaces }: SaveTripDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/send-trip-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          notes: data.notes || undefined,
          places: selectedPlaces,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Track successful trip plan submission
        trackEvent("submit_trip_plan", "form", "trip_planner", selectedPlaces.length);
        toast.success("Trip Plan Sent!", "Your trip plan has been sent successfully. We'll contact you soon!");
        setIsSuccess(true);
      } else {
        toast.error("Error", result.error || "Failed to send trip plan. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting trip plan:", error);
      toast.error("Error", "Failed to send trip plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after a delay to allow animation to finish if needed, 
    // but here we just reset immediately when closed if success was shown
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isSuccess ? "Trip Saved Successfully!" : "Save Your Trip Plan"}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {isSuccess
              ? "We have received your itinerary. One of our travel experts will contact you shortly to finalize your dream vacation."
              : "Enter your details below to save this itinerary. We'll get back to you with a custom quote."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <p className="text-center text-muted-foreground text-base">
              Thank you for choosing Easy Tripper!
            </p>
            <Button onClick={handleClose} className="w-full mt-4">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 pb-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                {...register("name")}
                className="h-10"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                {...register("email")}
                className="h-10"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input 
                id="phone" 
                placeholder="+1 234 567 8900" 
                {...register("phone")}
                className="h-10"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Additional Notes <span className="text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Textarea 
                id="notes" 
                placeholder="Any specific requirements, dates, or preferences?" 
                {...register("notes")}
                className="min-h-[100px] resize-none"
              />
            </div>

            <DialogFooter className="pt-4 pb-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Trip Plan"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
