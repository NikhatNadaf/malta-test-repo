"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "@/context/ueAuthContext";
import useCustomForm from "@/hooks/use-custom-form";
import { bookingSchema } from "@/lib/schema";
import { contactUs } from "@/data/link";
import { currency } from "@/data/currency";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePriceByGroupSize } from "@/features/getPriceByGroupSize";
import { CheckCircle, User, Users } from "lucide-react";
import TravelDatePicker from "../TravelDatePicker/TravelDatePicker";
import Cancellation from "./cancellation";

const TravellerDropdown = ({ travellers, setFormTravellers, maxPeople, onClose }) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const disableMinus = travellers <= 1;
  const disablePlus = travellers >= maxPeople;

  return (
    <div ref={dropdownRef} className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="block">Traveler (Age 0-120)</span>
          <span className="text-xs text-muted-foreground block">Minimum: 1, Maximum: {maxPeople}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" disabled={disableMinus} onClick={() => setFormTravellers(travellers - 1)}>-</Button>
          <span>{travellers}</span>
          <Button size="icon" variant="outline" disabled={disablePlus} onClick={() => setFormTravellers(travellers + 1)}>+</Button>
        </div>
      </div>
      <Button className="w-full block" onClick={onClose}>Apply</Button>
    </div>
  );
};

const BookingCard = ({ service, isLoading }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuthState();
  const { FormWrapper, setValue, watch } = useCustomForm({
    schema: bookingSchema,
    defaultValues: { travellers: 1 },
  });

  const [disabled, setIsDisabled] = useState(true);
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
  const inputRef = useRef(null);

  const travellers = watch("travellers");
  const { data } = usePriceByGroupSize(service?.id, travellers);

  let maxPeople;
  let unitPrice;
  let finalPrice;
  let priceTypeText;
  let priceIcon;

  if (data && data.matchingRows && data.matchingRows.length > 0) {
    maxPeople = data?.maxGroupSize ?? 0;
    unitPrice = data?.bestPrice ?? 0;
    finalPrice = unitPrice;
    priceTypeText = `Group up to ${maxPeople} people`;
    priceIcon = <Users className="inline-block w-5 h-5 mr-1" />;
  } else {
    maxPeople = 20;
    unitPrice = service.price;
    finalPrice = service.price * travellers;
    priceTypeText = `Price per Person`;
    priceIcon = <User className="inline-block w-5 h-5 mr-1" />;
  }

  useEffect(() => {
    if (user !== null && travellers >= 1 && travellers <= maxPeople && maxPeople > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [travellers, user, maxPeople]);

  const onSubmit = (query) => {
    router.push({
      pathname: `/bookings/${service?.id}`,
      query: { ...query },
    });
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
  };

  if (isLoading || !service) return null;

  return (
    <div>
      <Card className="sticky top-20 z-20">
        {/* Updated price box */}
        <div className="bg-white p-6 border-b text-center shadow-sm">
          <div className="mb-1 text-gray-500 text-sm font-medium flex justify-center items-center gap-1">
            {priceIcon} {priceTypeText}
          </div>
          <div className="text-4xl font-extrabold text-red-600">
            <span className="text-sm text-gray-400 font-normal mr-1">From</span>
            {currency.sign}{unitPrice}
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <FormWrapper className="flex flex-col gap-6" onSubmit={onSubmit} onError={onError}>
            <TravelDatePicker />

            <div className="relative">
              <label className="text-sm font-medium mb-1 block">Travellers</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  readOnly
                  value={`${travellers} Traveler${travellers > 1 ? "s" : ""}`}
                  className="w-full border rounded px-4 py-3 pl-10 cursor-pointer"
                  onClick={() => setShowTravellerDropdown(true)}
                />
              </div>
              {showTravellerDropdown && (
                <TravellerDropdown
                  travellers={travellers}
                  setFormTravellers={(val) => setValue("travellers", val)}
                  maxPeople={maxPeople}
                  onClose={() => setShowTravellerDropdown(false)}
                />
              )}
            </div>

            <p className="text-sm text-gray-500 text-right">
              Total Travellers: {travellers} / {maxPeople}
            </p>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-semibold">{currency.sign}{finalPrice}</span>
              </div>

              {user !== null ? (
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-[1.02]" disabled={disabled}>
                  Book Now
                </Button>
              ) : (
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-[1.02]">
                  <Link href={`/user/dashboard?auth=login&&redirectTo=${typeof window !== "undefined" ? window.location.pathname : "/"}`}>
                    Login To Continue
                  </Link>
                </Button>
              )}

              <div className="text-center text-sm text-gray-500 mt-4">
                <Link href={contactUs} className="text-black hover:underline transition-all duration-300">
                  Contact us for more details
                </Link>
              </div>
              
              <Cancellation />
              
            </div>
          </FormWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
