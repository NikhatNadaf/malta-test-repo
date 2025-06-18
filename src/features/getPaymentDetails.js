import { useQuery } from "@tanstack/react-query";

const getPaymentDetails = async (stripePromise, paymentIntentClientSecret) => {
  if (!paymentIntentClientSecret) {
    throw new Error("No payment intent client secret provided");
  }

  const stripe = await stripePromise;
  const { paymentIntent, error } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);

  if (error) {
    throw new Error(error.message);
  }

  return paymentIntent;
};

export const usePaymentDetails = (stripePromise, paymentIntentClientSecret) => {
  return useQuery({
    queryKey: ["paymentDetails", paymentIntentClientSecret],
    queryFn: () => getPaymentDetails(stripePromise, paymentIntentClientSecret),
    enabled: !!paymentIntentClientSecret,
    retry: false, // Avoid unnecessary retries if Stripe returns an error
  });
};
