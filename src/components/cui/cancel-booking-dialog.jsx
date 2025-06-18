import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import { cancelBookingSchema } from "@/lib/schema";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateBookingStatus } from "@/features/updateBookingStatus";
import axios from "axios";
import { useAuthState } from "@/context/ueAuthContext";
import { supabase } from "@/supabaseConfig";
import { sendCancellationEmail } from "@/features/sendEmail";
import { currency } from "@/data/currency";

export const CancelBookingDialog = ({ bookingDetails }) => {
  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: cancelBookingSchema,
  });
  const { user } = useAuthState();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelBooking = async (state) => {
    if (!user || !bookingDetails) return;

    setIsCancelling(true);

    try {
      const response = await axios.post("https://api.maltaxplore.com/refund", {
        paymentIntentId: bookingDetails?.payment_intent_id,
      });

      const basePrice = Number(bookingDetails?.service_base_price);
      const taxRate = bookingDetails?.fees ? Number(bookingDetails.fees) : 0;
      const taxesAndFees = (basePrice * taxRate) / 100;
      const discountAmount = Number(bookingDetails?.discount_amount) || 0;
      const finalPrice = basePrice + taxesAndFees - discountAmount;

      const templateDetails = {
        user_email: user?.email,
        guest_name: user?.name,
        service_name: bookingDetails?.service_id?.name,
        booking_id: bookingDetails?.id,
        refund_amount: currency.sign + finalPrice,
        company_name: "MaltaXplore",
      };

      if (response.data && response.data.status === "succeeded") {
        await sendCancellationEmail(templateDetails);
        console.log("Updating DB to cancelled!", bookingDetails?.id);

        const updatedBooking = await updateBookingStatus(bookingDetails?.id);

        const paymentData = {
          // user_email: bookingDetails?.created_by?.email,
          booking_id: bookingDetails?.id,
          user_id: bookingDetails?.created_by?.id,
          supplier_id: bookingDetails?.supplier_id,
          service_id: bookingDetails?.service_id?.id,
          amount: bookingDetails?.service_base_price,
          payment_intent_id: bookingDetails?.payment_intent_id,
          message: state?.message,
          done_by: user?.id,
        };

        const { data, error } = await supabase
          .from("payments")
          .insert([paymentData]);

        if (error) {
          console.error("Error inserting payment data:", error);
        } else {
          console.log(
            "Booking successfully cancelled! and payments inserted",
            data
          );
        }
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error occurred during refund:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsCancelling(false);
    }
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
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <Button variant=""> Cancel Booking</Button>
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl">Cancel Booking</DialogTitle>
          </DialogHeader>
          <FormWrapper
            className="flex flex-col gap-6"
            onSubmit={handleCancelBooking}
            onError={onError}
          >
            <div className="space-y-2">
              <FormInput
                id="message"
                title="Message"
                placeholder="Type message"
                required
              />
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" variant={"default"} disabled={isCancelling}>
                {isCancelling ? "Cancelling..." : "Cancel"}{" "}
              </Button>
            </DialogFooter>
          </FormWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
};
