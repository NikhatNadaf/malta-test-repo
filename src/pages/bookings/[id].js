"use client";
import React, { useEffect, useState } from "react";
import { StepperComponent } from "@/components/ui/stepper";
import ContactDetailsPage from "@/components/Bookings/contact-detail";
import ActivityDetailsPage from "@/components/Bookings/activity-detail";
import PaymentDetailsPage from "@/components/Bookings/paymentDetails";
import { BookingProvider } from "@/context/bookingContext";
import { ChevronRight } from "lucide-react";
import BookingDetailCard from "@/components/Bookings/booking-detail-card";
import { supabase } from "@/supabaseConfig";

const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState(null);

  const nextStep = () => {
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Auth error:", authError?.message);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error("User fetch error:", error.message);
      } else {
        setUserDetails(data);
      }
    };

    fetchUser();
  }, []);

  return (
    <BookingProvider>
      <div className="px-20 pt-12">
        <StepperComponent
          activeStep={activeStep}
          nextStep={nextStep}
          setActiveStep={setActiveStep}
        />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-24">
            <div className="col-span-1 md:col-span-2">
              <div className={activeStep === 0 ? "block" : "hidden"}>
                <ContactDetailsPage nextStep={nextStep} userDetails={userDetails} />
              </div>
              <div className={activeStep === 1 ? "block" : "hidden"}>
                <ActivityDetailsPage nextStep={nextStep} prevStep={prevStep} />
              </div>
              <div className={activeStep === 2 ? "block" : "hidden"}>
                <PaymentDetailsPage nextStep={nextStep} prevStep={prevStep} />
              </div>
            </div>
            <BookingDetailCard />
          </div>
        </div>
      </div>
    </BookingProvider>
  );
};

export default BookingPage;
