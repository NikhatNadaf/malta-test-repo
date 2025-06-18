import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "./ueAuthContext";
import { useService } from "@/features/getServiceById";
import { useTaxRate } from "@/features/getTaxAndRate";
import { currency } from "@/data/currency";
import { usePromoCodes } from "@/features/getPromoCodes";
import { supabase } from "@/supabaseConfig";
import { fetchClientSecret } from "@/apis/api";
import { Skeleton } from "@/components/ui/skeleton";
import { usePriceByGroupSize } from "@/features/getPriceByGroupSize";

const BookingContext = createContext();

// Custom hook to access the context
export const useBooking = () => {
    return useContext(BookingContext);
};

// Provider component
export const BookingProvider = ({ children }) => {
    const router = useRouter();
    const { user } = useAuthState();
    const {
        id,
        travellers: travellers,
        startDate,
        endDate,
    } = router.query; // url query Parameters

    const [loading, setLoading] = useState(true);
    const { data: taxRate } = useTaxRate();
    const { data: tourData } = useService(id);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState();
    const [appliedCode, setAppliedCode] = useState("");
    const [disabled, setIsDisabled] = useState(false);
    const traveller_count = travellers ? Number(travellers) : 1;

    // Always call hooks at the top level
    const { data: travellingPrice } = usePriceByGroupSize(
        tourData?.id,
        traveller_count
    );

    let basePrice = 0;
    let totalPrice = 0;
    if (tourData?.price == null) {
        basePrice = Number(travellingPrice?.bestPrice) || 0;
        totalPrice = basePrice;
    } else {
        totalPrice = tourData?.price * traveller_count;
        basePrice = Number(totalPrice);
    }

    // const stripeAccountId = tourData?.supplieraccess?.supplier_company_id?.stripe_connect_id;


    const commissionPercentage = Number(tourData?.service_type?.commission) || 0;

    const commissionAmount = (basePrice * commissionPercentage) / 100;
    const transferAmount = basePrice - commissionAmount;

    const taxesAndFees = (basePrice * taxRate?.[0]?.tax_rate) / 100;
    const discountAmount = discountedPrice
        ? basePrice - Number(discountedPrice)
        : 0;
    const finalPrice = basePrice + taxesAndFees - discountAmount;

    useEffect(() => {
        if (
            user !== null &&
            tourData &&
            traveller_count >= 1 &&
            traveller_count <= tourData.maximum_group_size || 0
        ) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    }, [traveller_count, tourData, user]);

    useEffect(() => {
        // if (!user?.email || !finalPrice || !stripeAccountId || !transferAmount) return;
        if (!user?.email || !finalPrice || !transferAmount) return;

        // Create entry using API Call
        fetchClientSecret({
            amount: Math.round(finalPrice * 100),
            currency: currency.type,
            email: user?.email,
            // account_id: stripeAccountId,
            transfer_amount: Math.round(transferAmount * 100),
        })
            .then((response) => {
                console.log("response :", response)
                setPaymentIntentId(response?.data?.paymentIntent?.id);
                setClientSecret(response?.data?.clientSecret);
                setLoading(false);
            })
            .catch((err) => {
                console.error("err", err);
            });
    }, [finalPrice, user?.email, transferAmount]);
    // }, [finalPrice, user?.email, stripeAccountId, transferAmount]);

    const { data: promoCodes } = usePromoCodes(id, totalPrice);

    const applyPromoCode = async (promoCode) => {
        if (!promoCode) {
            console.log("Please enter a promo code.");
            return;
        }
        if (!promoCodes || promoCodes.length === 0) {
            console.log("Promo codes not loaded or empty.");
            return;
        }

        const selectedCode = promoCodes.find((code) => code.code === promoCode);

        if (!selectedCode) {
            console.log("Invalid or inapplicable promo code.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("promocodeusages")
                .insert([
                    {
                        promo_code_id: selectedCode.id,
                        service_id: id,
                        user_id: user?.id,
                    },
                ])
                .select();

            if (error) throw error;

            setAppliedCode(selectedCode);

            let discountedPrice = totalPrice;

            if (selectedCode.type === "fixed") {
                discountedPrice = Math.max(0, totalPrice - selectedCode.discount_value);
            } else if (selectedCode.type === "percentage") {
                const discount = (totalPrice * selectedCode.discount_value) / 100;
                discountedPrice = Math.max(0, totalPrice - discount);
            }

            setDiscountedPrice(discountedPrice);
        } catch (error) {
            console.error("Error applying promo code:", error.message);
        }
    };

    const removePromoCode = async (reset) => {
        if (!appliedCode) {
            console.log("No promo code applied.");
            return;
        }

        try {
            const { error } = await supabase
                .from("promocodeusages")
                .delete()
                .eq("promo_code_id", appliedCode?.id);

            if (error) throw error;

            setDiscountedPrice(basePrice);
            setAppliedCode("");
            reset();
            console.log("Promo Code Removed. Total Price Reset:", basePrice);
        } catch (error) {
            console.error("Error removing promo code:", error.message);
        }
    };

    if (loading) {
        return (
            <div className="space-y-2 px-32 min-h-screen">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-[90%]" />
                <Skeleton className="h-6 w-[70%]" />
            </div>
        );
    }
    return (
        <BookingContext.Provider
            value={{
                id,
                traveller_count,
                startDate,
                endDate,
                taxRate,
                totalPrice,
                tourData,
                taxesAndFees,
                discountAmount,
                basePrice,
                clientSecret,
                finalPrice,
                clientSecret,
                paymentIntentId,
                setDiscountedPrice,
                applyPromoCode,
                appliedCode,
                setAppliedCode,
                promoCodes,
                removePromoCode,
                disabled
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
