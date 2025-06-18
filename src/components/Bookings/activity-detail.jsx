"use client";
import React, { useEffect, useState } from "react";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { maltaLocations } from "@/data/data";
import { activityDetailsSchema } from "@/lib/schema";
import { useAddress } from "@/context/addressContext";
import { useBooking } from "@/context/bookingContext";

const ActivityDetailsPage = ({ nextStep, prevStep }) => {
  const { toast } = useToast();
  const {
    setPickupLocation,
    setCity,
    setState,
    setPostalCode,
    setAddLine1,
    setAddLine2,
    setPickupTime,
    setAddNote,
  } = useAddress();
  const { tourData } = useBooking();

  const { FormWrapper, FormInput, FormDateTimePicker, FormSelect, watch } =
    useCustomForm({
      schema: activityDetailsSchema,
    });

  const [disabled, setDisabled] = useState(true);
  const pickupDate = watch("pickupTime");

  useEffect(() => {

    if (!tourData || !pickupDate) {
      setDisabled(true);
      return;
    }

    const startDate = new Date("2024-01-01T00:00:00");
    const endDate = new Date("2030-12-31T23:59:59");
    const selectedDate = new Date(pickupDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isNaN(selectedDate.getTime())) {
      const isValid =
        selectedDate >= today &&
        selectedDate >= startDate &&
        selectedDate <= endDate;

      setDisabled(!isValid);

      if (!isValid) {
        toast({
          variant: "destructive",
          title: "Invalid Pickup Date",
          description: "Please select a valid future date.",
        });
      }
    } else {
      setDisabled(true);
    }
  }, [pickupDate]);

  const handleSubmit = async (data) => {
    setPickupLocation(data.location);
    setPickupTime(data.pickupTime);
    setCity(data.city);
    setState(data.state);
    setPostalCode(data.postalCode);
    setAddLine1(data.addLine1);
    setAddLine2(data.addLine2), nextStep();
    setAddNote(data.add_note);
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-2">
        <p className="text-3xl font-semibold my-8">Address Details</p>

        <FormWrapper
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          onError={onError}
        >
          <div className="col-span-2">
            <FormSelect
              id="location"
              options={maltaLocations}
              title="Pickup Location"
              placeholder="Select a location"
              className="bg-white h-12"
              required
            />
          </div>

          <div className="col-span-1">
            <FormDateTimePicker
              placeholder="Pickup Time"
              required
              title={"Pickup Time"}
              id="pickupTime"
              futureOnly={true}
            />
          </div>

          <div className="space-y-6">
            <FormInput
              id="addLine1"
              title="Address Line 1"
              placeholder="Type your address"
              required
              className="h-12"
            />
            <FormInput
              id="addLine2"
              title="Address Line 2..."
              placeholder="Type your address"
              required
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormInput
              id="city"
              title="City/Town"
              placeholder="Type your city name"
              required
              className="h-12"
            />
            <FormInput
              id="state"
              title="State"
              placeholder="Type your state name"
              className="h-12"
            />
            <FormInput
              id="postalCode"
              title="Zip/Postal Code"
              placeholder="Type your zip code"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-6">
            <FormInput
              id="add_note"
              title="Note"
              placeholder="Add Note : if any additional message for The owner of this Service"
              className="h-12"
            />
          </div>

          <div className="my-8 flex justify-center mt-8 gap-4">
            <Button
              variant="destructive"
              className="w-3/5 h-12 bg-black rounded-full"
              type="button"
              onClick={prevStep}
            >
              Previous
            </Button>

            <Button
              variant="destructive"
              className="w-3/5 h-12 rounded-full"
              disabled={disabled}
            >
              Next
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
