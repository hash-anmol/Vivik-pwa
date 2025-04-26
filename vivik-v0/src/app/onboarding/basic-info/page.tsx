"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  birthDate: z.date({
    required_error: "Birth date is required",
  }).refine((date) => {
    // Check if the user is at least 18 years old
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return date <= eighteenYearsAgo;
  }, "You must be at least 18 years old to use this service"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
});

export default function BasicInfoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualDateInput, setManualDateInput] = useState("");

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // TODO: Save data to backend
      console.log("Form values:", values);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step
      router.push("/onboarding/next-step");
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle manual date input
  const handleManualDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setManualDateInput(input);
    
    // Try to parse the date if it matches DD/MM/YYYY format
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = input.match(dateRegex);
    
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // Month is 0-indexed
      const year = parseInt(match[3], 10);
      
      const date = new Date(year, month, day);
      
      // Check if it's a valid date
      if (!isNaN(date.getTime())) {
        form.setValue("birthDate", date);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top progress bar */}
      <div className="w-full px-6 pt-6 pb-8">
        <Link href="/" className="inline-block mb-6">
          <ArrowLeft className="h-6 w-6 text-black" />
        </Link>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-[#5B9BD5] w-1/5 h-2 rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pb-4 mt-16 max-w-xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-2 text-left">Basic Information</h1>
        <p className="text-gray-500 text-lg mb-8 text-left">Tell us a bit about yourself</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="h-14 text-lg px-4 rounded-lg border-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birth Date */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-medium">Birth Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className="relative flex items-center w-full cursor-pointer">
                          <CalendarIcon className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
                          <Input
                            placeholder="DD/MM/YYYY"
                            value={field.value ? formatDate(field.value) : manualDateInput}
                            onChange={handleManualDateInput}
                            className="h-14 text-lg pl-12 pr-4 rounded-lg border-gray-300"
                          />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (date) {
                            setManualDateInput(formatDate(date));
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <div className="text-sm text-gray-500">
                          You must be at least 18 years old to use this service.
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-lg font-medium">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="h-5 w-5 text-[#5B9BD5] border-[#5B9BD5]" />
                        <Label htmlFor="male" className="text-lg">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="h-5 w-5 text-[#5B9BD5] border-[#5B9BD5]" />
                        <Label htmlFor="female" className="text-lg">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" className="h-5 w-5 text-[#5B9BD5] border-[#5B9BD5]" />
                        <Label htmlFor="other" className="text-lg">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Continue Button */}
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-medium bg-[#5B9BD5] hover:bg-[#4A8AC4] text-white rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
} 