"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Loader2, Star, MessageSquare, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(2, "Country is required"),
  comment: z.string().min(10, "Feedback must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FeedbackFormData) => void;
  isSubmitting?: boolean;
}

export function FeedbackForm({ isOpen, onClose, onSubmit, isSubmitting: externalSubmitting }: FeedbackFormProps) {
  const [selectedRating, setSelectedRating] = useState(5);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formSubmitting },
    reset,
    setValue,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const isSubmitting = externalSubmitting !== undefined ? externalSubmitting : formSubmitting;

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const onFormSubmit = async (data: FeedbackFormData) => {
    try {
      await onSubmit({ ...data, rating: selectedRating });
      // Only reset and close on successful submission
      // The parent component handles success/error and closes the dialog
      reset();
      setSelectedRating(5);
    } catch (error) {
      // Error is handled by parent component
      console.error("Form submission error:", error);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedRating(5);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] flex flex-col p-0 gap-0">
        {/* Header Section */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Share Your Experience
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-base">
            We'd love to hear about your journey with Easy Tripper. Your feedback helps us improve!
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6" id="feedback-form">
            {/* Rating Section */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                Your Rating *
              </Label>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2 flex-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1",
                        selectedRating >= rating
                          ? "text-amber-500"
                          : "text-gray-300"
                      )}
                      aria-label={`Rate ${rating} out of 5`}
                    >
                      <Star 
                        className={cn(
                          "h-8 w-8 transition-all duration-200",
                          selectedRating >= rating
                            ? "fill-amber-500 text-amber-500 drop-shadow-sm"
                            : "fill-transparent"
                        )}
                      />
                    </button>
                  ))}
                </div>
                {selectedRating > 0 && (
                  <span className="text-sm font-medium text-muted-foreground min-w-[60px] text-right">
                    {selectedRating}/5
                  </span>
                )}
              </div>
              {errors.rating && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Your Name *
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-11 text-base"
                disabled={isSubmitting}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Country Field */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Country *
              </Label>
              <Input
                id="country"
                placeholder="United States"
                className="h-11 text-base"
                disabled={isSubmitting}
                {...register("country")}
              />
              {errors.country && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Comment Field */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-base font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Your Feedback *
              </Label>
              <Textarea
                id="comment"
                placeholder="Tell us about your experience with Easy Tripper. What did you enjoy most? Any suggestions for improvement?"
                rows={6}
                className="resize-none text-base min-h-[120px]"
                disabled={isSubmitting}
                {...register("comment")}
              />
              <p className="text-xs text-muted-foreground">
                Minimum 10 characters required
              </p>
              {errors.comment && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.comment.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Footer Section */}
        <DialogFooter className="px-6 py-4 border-t bg-muted/30 gap-3 flex-shrink-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose} 
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="feedback-form"
            disabled={isSubmitting} 
            size="lg"
            className="flex-1 sm:flex-initial"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

