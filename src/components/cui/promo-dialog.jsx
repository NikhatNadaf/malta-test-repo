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
import { Input } from "@/components/ui/input";
import { useBooking } from "@/context/bookingContext";
import { supabase } from "@/supabaseConfig";
import { useAuthState } from "@/context/ueAuthContext";
import { MoreOffersComponent } from "./more-promo-code";
import { usePromoCodes } from "@/features/getPromoCodes";
import { promoCodeSchema } from "@/lib/schema";
import useCustomForm from "@/hooks/use-custom-form";

const PromCodeDialog = () => {
  const { FormWrapper, FormInput, reset } = useCustomForm({
    schema: promoCodeSchema,
  });
  const { applyPromoCode, appliedCode, removePromoCode } = useBooking();
  const onSubmit = async (data) => {
    applyPromoCode(data?.promoCode);
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: errors,
    });
  };

  return (
    <div>
      {!appliedCode ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="underline text-muted-foreground">
              Enter promo code
            </button>
          </DialogTrigger>
          <DialogContent className="p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl">Promo Code</DialogTitle>
            </DialogHeader>
            <FormWrapper className="" onSubmit={onSubmit} onError={onError}>
              <FormInput
                id={"promoCode"}
                title={"Enter promo code"}
                placeholder="Enter promo code here"
                className="h-12 w-full"
              />

              <Button className="w-24 mt-4">Apply</Button>
            </FormWrapper>
          </DialogContent>
        </Dialog>
      ) : (
        <button
          className="underline text-muted-foreground text-red-500"
          onClick={() => removePromoCode(reset)}
        >
          Remove promo code
        </button>
      )}
    </div>
  );
};

export default PromCodeDialog;
