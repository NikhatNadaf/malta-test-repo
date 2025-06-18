import React from "react";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import success from "../../public/success.json";
import failed from "../../public/failed.json";
import loadingAnimation from "../../public/loading.json";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { usePaymentDetails } from "@/features/getPaymentDetails";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
const CompletePage = () => {
  const router = useRouter();
  const {
    bookingId,
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
  } = router.query;

  const { data: paymentDetails, loading } = usePaymentDetails(
    stripePromise,
    payment_intent_client_secret
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 my-10">
      {!loading && redirect_status && (
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div>
              {!loading &&
              redirect_status &&
              redirect_status === "succeeded" ? (
                <Lottie animationData={success} loop={false} autoplay={true} />
              ) : (
                <Lottie animationData={failed} loop={false} autoplay={true} />
              )}
            </div>
            <h1 className="text-2xl font-bold">
              {redirect_status && redirect_status === "succeeded"
                ? "🎉 Payment Successful!"
                : "❌ Payment Failed"}
            </h1>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium">
              {redirect_status === "succeeded"
                ? "Your payment has been successfully processed."
                : "Your payment could not be completed. Please try again."}
            </p>
            {redirect_status && paymentDetails && (
              <div className="px-8 py-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-muted-foreground text-sm">
                    Amount Paid:
                  </div>
                  <div className="font-medium">
                    ${(paymentDetails.amount / 100).toFixed(2)}{" "}
                    {paymentDetails.currency?.toUpperCase()}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-muted-foreground text-sm">
                    Payment Method:
                  </div>
                  <div className="font-medium">
                    {paymentDetails.payment_method_types
                      ?.join(", ")
                      ?.toUpperCase()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-muted-foreground text-sm">
                    Payment Time:
                  </div>
                  <div className="font-medium">
                    {new Date(paymentDetails.created * 1000).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600">
              Payment Intent ID:{" "}
              <span className="font-mono">{payment_intent}</span>
            </p>
          </CardContent>
          <CardFooter className="flex justify-center mt-6">
            <Link
              href="/"
              className={`px-6 py-2 rounded-md text-white ${
                redirect_status === "succeeded"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } transition`}
            >
              Home
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CompletePage;
