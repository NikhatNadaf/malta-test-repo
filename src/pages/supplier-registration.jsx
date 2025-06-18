"use client";

import React from "react";

import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { addSeller, businessActivities, types } from "@/lib/schema";
import { v4 } from "uuid";
import Banner from "@/components/cui/banner";

function SupplierRegistration() {
  const { toast } = useToast();

  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    watch,
  } = useCustomForm({
    schema: addSeller,
  });

  const businessType = watch("type");

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };

  const handleSubmit = async (data) => {
    // try {
    //   await writeData(`/supplier-queries/${v4()}`, data);
    //   toast({
    //     variant: "success",
    //     title: "Form Submitted",
    //     description: "Registration Successfull!",
    //   });
    // } catch (error) {
    //   console.error("Error submitting the form: ", error);
    // }
  };

  return (
    <div className="from-primary-foreground bg-gradient-to-br to-transparent">
      <div className="pt-16 relative">
        <Banner url="/corporate-partnership.png">
          <h1 className="text-xl md:text-4xl max-md:text-center font-bold text-white">
            Join Malta’s Leading Tourism Platform
          </h1>
        </Banner>
      </div>
      <main className="px-8 md:px-32 relative -mt-16">
        <Card className="w-[70vw] md:w-[50vw] mx-auto">
          <CardHeader>
            <p className="text-2xl font-semibold mx-7 max-md:text-center">Supplier Registration</p>
          </CardHeader>
          <CardContent className="md:mx-8 my-4">
            <FormWrapper
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              onError={onError}
            >
              <FormSelect
                id="type"
                options={types}
                title="Business Type"
                className="p-4 h-12"
                required
              />
              <FormSelect
                id="activities"
                options={businessActivities[businessType] ?? []}
                title="Tours/Activities"
                className="h-12"
                required
              />
              {[
                {
                  id: "businessName",
                  label: "Business Name",
                  placeholder: "Type your business name",
                },
                {
                  id: "name",
                  label: "Contact Person",
                  placeholder: "Contact person name",
                },
                {
                  id: "contactNumber",
                  label: "Phone number",
                  placeholder: "Phone number",
                },
                { id: "email", label: "Email", placeholder: "Email address" },
                {
                  id: "businessAddress",
                  label: "Business Address",
                  placeholder: "Business address",
                },
                {
                  id: "license",
                  label: "Business License Number",
                  placeholder: "License number",
                },
              ].map((input) => (
                <FormInput
                  id={input.id}
                  title={input.label}
                  placeholder={input.placeholder}
                  required
                  className="h-12"
                />
              ))}

              <Button className="w-full md:w-48 p-6 text-base">Submit</Button>
            </FormWrapper>
          </CardContent>
        </Card>
        <div className="md:px-32 lg:px-64 mt-16">
          <p className="text-center">
            Our team will review your information and activate your account
            <span className="text-primary"> within 48 hours</span>. Once approved, you’ll be
            able to list your services, manage bookings, and start growing your
            business with MaltaXplore.
          </p>
        </div>
      </main>
    </div>
  );
}

export default SupplierRegistration;
