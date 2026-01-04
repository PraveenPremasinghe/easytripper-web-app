"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { DatePicker } from "@/components/ui/date-picker";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  travelers: z.string().min(1, "Number of travelers is required"),
  budget: z.string().min(1, "Budget range is required"),
  interests: z.string().min(1, "Please select at least one interest"),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Silent fail for bots
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-inquiry-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          startDate: data.startDate,
          endDate: data.endDate,
          travelers: data.travelers,
          budget: data.budget,
          interests: data.interests,
          message: data.message || undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        reset();
        toast.success(
          "Inquiry Sent Successfully!",
          "We've received your inquiry and will get back to you within 24 hours."
        );
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast.error(
          "Submission Failed",
          result.error || "Something went wrong. Please try again or contact us directly."
        );
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error(
        "Submission Failed",
        "Something went wrong. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="sticky top-24">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
          <h3 className="mb-2 text-xl font-semibold">Thank you!</h3>
          <p className="text-muted-foreground">
            We&apos;ve received your inquiry and will get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Plan Your Trip</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill out the form below and we&apos;ll create a customized itinerary for you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot */}
          <input
            type="text"
            {...register("honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                value={watch("startDate")}
                onChange={(value) => setValue("startDate", value, { shouldValidate: true })}
                placeholder="Select start date"
                required
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="endDate">
                End Date <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                value={watch("endDate")}
                onChange={(value) => setValue("endDate", value, { shouldValidate: true })}
                placeholder="Select end date"
                required
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="travelers">
              Number of Travelers <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("travelers", value)}
              defaultValue={watch("travelers")}
            >
              <SelectTrigger id="travelers">
                <SelectValue placeholder="Select travelers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 person</SelectItem>
                <SelectItem value="2">2 people</SelectItem>
                <SelectItem value="3-4">3-4 people</SelectItem>
                <SelectItem value="5-6">5-6 people</SelectItem>
                <SelectItem value="7+">7+ people</SelectItem>
              </SelectContent>
            </Select>
            {errors.travelers && (
              <p className="mt-1 text-sm text-red-500">
                {errors.travelers.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="budget">
              Budget Range <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("budget", value)}
              defaultValue={watch("budget")}
            >
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget ($30-50/day)</SelectItem>
                <SelectItem value="mid-range">Mid-range ($50-100/day)</SelectItem>
                <SelectItem value="luxury">Luxury ($150+/day)</SelectItem>
              </SelectContent>
            </Select>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="interests">
              Interests <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("interests", value)}
              defaultValue={watch("interests")}
            >
              <SelectTrigger id="interests">
                <SelectValue placeholder="Select interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="culture">Culture & History</SelectItem>
                <SelectItem value="nature">Nature & Wildlife</SelectItem>
                <SelectItem value="beaches">Beaches & Relaxation</SelectItem>
                <SelectItem value="adventure">Adventure & Hiking</SelectItem>
                <SelectItem value="food">Food & Cuisine</SelectItem>
                <SelectItem value="mixed">Mixed Experience</SelectItem>
              </SelectContent>
            </Select>
            {errors.interests && (
              <p className="mt-1 text-sm text-red-500">
                {errors.interests.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Tell us more about your travel preferences..."
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Inquiry"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

