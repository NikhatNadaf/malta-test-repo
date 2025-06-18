"use client";
import React, { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "@/context/ueAuthContext";
import { useContactDetails } from "@/context/contactDetailsContext";
import { useAddress } from "@/context/addressContext";
import { useBooking } from "@/context/bookingContext";
import { supabase } from "@/supabaseConfig";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY); // pktest

const PaymentDetails = ({ prevStep }) => {
    const { toast } = useToast();
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

    const { user } = useAuthState();
    const { userId } = useContactDetails();
    const {
        pickupLocation, pickupTime, city, state, postalCode, addLine1, addLine2,add_note
    } = useAddress();
    const {
        paymentIntentId, tourData, finalPrice, taxRate, discountAmount,
        totalPrice, startDate, endDate, clientSecret
    } = useBooking();

    // Format pickup date and time
    let pickupDate = "", pickupTimeStr = "";
    if (pickupTime && !isNaN(new Date(pickupTime).getTime())) {
        const dateObj = new Date(pickupTime);
        pickupDate = dateObj.toISOString().split("T")[0];
        pickupTimeStr = dateObj.toTimeString().split(" ")[0];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !clientSecret || !stripe || !elements || isProcessing || !isPaymentElementReady) {
            toast({
                variant: "destructive",
                title: "Payment Not Ready",
                description: "Payment form is not fully loaded or initialized.",
            });
            return;
        }
        setIsProcessing(true);


        // Save booking in DB : initiate Payment status
        const { data: bookingData, error: bookingError } = await supabase
            .from("servicebookings")
            .insert([{
                service_id: tourData?.id,
                supplier_id: tourData?.supplier_access_id,
                payment_status: false,
                status: "pending",
                payment_intent_id: paymentIntentId,
                created_by: user?.id,
                pickup_location: pickupLocation,
                pickup_date: pickupDate,
                pickup_time: pickupTimeStr,
                city,
                address_line_1: addLine1,
                address_line_2: addLine2,
                state,
                postal_code: postalCode,
                country: "india",
                start_date: new Date(Number(startDate)),
                end_date: new Date(Number(endDate)),
                service_base_price: totalPrice,
                fees: taxRate?.[0]?.tax_rate,
                discount_amount: discountAmount,
                add_note: add_note,
            }])
            .select()
            .single();

        if (bookingError || !bookingData) {
            toast({
                variant: "destructive",
                title: "Booking Failed",
                description: "Could not save booking. Please try again.",
            });
            console.log("error : ", bookingError)
            setIsProcessing(false);
            return;
        }

        // Inserted booking persons
        const bookingId = bookingData.id;


        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                 confirmParams: {
                    // return_url: `${window.location.origin}/success`,
                    // return_url: `${window.location.origin}/verify?bookingId=${bookingId}`,
                },
                redirect: "if_required",
            });

            if (error) {
                toast({
                    variant: "destructive",
                    title: "Payment Failed",
                    description: error.message,
                });
                setIsProcessing(false);
                return;
            }

            if (paymentIntent?.status === "succeeded") {
                toast({
                    variant: "success",
                    title: "Payment Success",
                    description: "Payment has been completed successfully.",
                });

                // update servicebookings status from intiated to confirmed
                const { updateStatusData, updateStatusError } = await supabase
                    .from("servicebookings")
                    .update({ status: "confirmed", payment_status: true })
                    .eq("id", bookingId); // assuming 'id' is the primary key column

                if (updateStatusError) {
                    toast({
                        variant: "destructive",
                        title: "Booking Update Failed.",
                        description: "Your payment was successful, but we couldn not update your booking status. Please contact our support team for assistance.",
                    });
                    // console.error("Failed to update booking status:", error.message);
                }

                const persons = [
                    ...userId.map((uid) => ({
                        user_id: uid,
                        service_id: tourData?.id,
                        supplier_id: tourData?.supplier_access_id,
                        booking_id: bookingId,
                    })),
                    {
                        user_id: user?.id,
                        service_id: tourData?.id,
                        supplier_id: tourData?.supplier_access_id,
                        booking_id: bookingId,
                    },
                ];

                const { insertBookingPersonData, insertBookingPersonError } = await supabase.from("servicebookingperson").insert(persons);

                if (insertBookingPersonError) {
                    toast({
                        variant: "destructive",
                        title: "Booking Confirmation Issue.",
                        description: "Your payment was successful, but we could not finalize your booking details. Please contact our support team for assistance. ",
                    });
                }
                window.location.href = `/user/upcoming-bookings`;
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Unexpected Error",
                description: error?.message || "Something went wrong during payment.",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form className="w-full" id="payment-form" onSubmit={handleSubmit}>
            <div className="col-span-2">
                <p className="text-3xl font-semibold my-8">Payment Details</p>
                <div className="my-6">
                    <p className="text-base font-medium my-2">Pay with:</p>
                    <PaymentElement id="payment-element" onReady={() => setIsPaymentElementReady(true)} />
                    <div className="flex flex-col mt-4">
                        <div className="text-2xl flex items-center justify-between">
                            <span>Total Price: €{Number(finalPrice).toFixed(2)}</span>
                            <Button
                                variant="destructive"
                                className="bg-[#f1b203] text-black font-semibold text-base w-3/5 h-12 rounded-full"
                                id="submit"
                                disabled={!stripe || !elements || isProcessing || !isPaymentElementReady}
                            >
                                {isProcessing ? "Processing..." : "Complete Booking"}
                            </Button>
                        </div>
                        <p className="text-sm my-4">
                            By clicking "Complete Booking", you acknowledge that you have
                            read and are bound by MaltaXplore's Terms & Privacy and Cookies Statement;
                            Viator's Terms; plus the tour operator's rules & regulations.
                        </p>
                    </div>
                    <p className="text-sm my-4">
                        Your booking is facilitated by MaltaXplore, but a third-party tour operator provides the tour/activity directly to you.
                    </p>
                    <p className="text-sm my-4">
                        Your statement will list MaltaXplore as the merchant for this transaction.
                    </p>
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
                </div>
            </div>
        </form>
    );
};

const PaymentDetailsPage = ({ nextStep = () => { }, prevStep = () => { } }) => {
    const { clientSecret } = useBooking();
    const [stripeLoaded, setStripeLoaded] = useState(false);

    useEffect(() => {
        stripePromise.then(() => setStripeLoaded(true));
    }, []);

    if (!clientSecret || !stripeLoaded) {
        return <div>Loading payment form...</div>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentDetails nextStep={nextStep} prevStep={prevStep} />
        </Elements>
    );
};

export default PaymentDetailsPage;
