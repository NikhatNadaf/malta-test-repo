import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBooking } from "@/context/bookingContext";
import useCustomForm from "@/hooks/use-custom-form";
import { promoCodeSchema } from "@/lib/schema";
import { usePromoCodes } from "@/features/getPromoCodes";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown } from "lucide-react";

export function MoreOffersComponent() {
  const { FormWrapper, FormInput, reset, setValue } = useCustomForm({
    schema: promoCodeSchema,
  });
  const {
    promoCodes,
    applyPromoCode,
    appliedCode,
    removePromoCode,
    setAppliedCode,
  } = useBooking();
  // const { data: promoCodes } = usePromoCodes(id, totalPrice);

  const onSubmit = async (data) => {
    if (!appliedCode) {
      applyPromoCode(data?.promoCode);
    } else {
      removePromoCode(reset);
    }
  };
  const applyButton = async (promoCodee) => {
    applyPromoCode(promoCodee?.code);
    setValue("promoCode", promoCodee?.code);
  };

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: errors,
    });
  };

  return (
    <Sheet className="w-[800px] overflow">
      <SheetTrigger asChild>
        <ChevronDown className="hover:cursor-pointer w-4 h-4"/>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>More Offers</SheetTitle>
          <SheetDescription>
            Enter a promo code to get discounts
          </SheetDescription>
        </SheetHeader>
        <div>
          <FormWrapper className="my-8" onSubmit={onSubmit} onError={onError}>
            <FormInput
              id={"promoCode"}
              title={"Enter promo code"}
              placeholder="Enter promo code here"
              className="h-12"
            />

            {appliedCode ? (
              <Button className="w-24 mt-4">Remove</Button>
            ) : (
              <Button className="w-24 mt-4">Apply</Button>
            )}
          </FormWrapper>
        </div>

        <div>
          <SheetTitle>Available Coupons</SheetTitle>
          {promoCodes?.map((p, i) => {
            return (
              <div>
                <Card
                  key={p?.id}
                  className="w-full mt-6 border border-gray-300 rounded shadow-none"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="border-2 border-dashed uppercase w-28 py-2 text-center text-xs bg-red-100 border-red-500 font-semibold">
                        {p?.code}
                      </div>
                      <Button
                        variant={"default"}
                        className="w-24"
                        onClick={() => applyButton(p)}
                      >
                        Apply
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold">
                      {p?.type === "fixed"
                        ? `Get flat $${p?.discount_value} off`
                        : `Get ${p?.discount_value}% off`}
                    </div>
                    {/* <div className="text-xs mt-2 text-gray-500">
                      {new Date(p?.end_date).toLocaleDateString()}
                    </div> */}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
