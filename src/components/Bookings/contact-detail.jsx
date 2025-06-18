"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { contactDetailsSchema } from "@/lib/schema";
import { useContactDetails } from "@/context/contactDetailsContext";

const ContactDetailsPage = ({ nextStep, userDetails }) => {
    const { toast } = useToast();
    const { setUserId, setUserEmail } = useContactDetails();

    const { FormWrapper, FormInput, setValue } = useCustomForm({
        schema: contactDetailsSchema,
    });

    useEffect(() => {
        if (userDetails) {
            setValue("name", userDetails.name || "");
            setValue("email", userDetails.email || "");
            setValue("mobile_no", userDetails.mobile_no || "");
        }
    }, [userDetails, setValue]);

    const handleSubmit = async (data) => {
        try {
            if (!userDetails?.id) {
                throw new Error("User not found. Please check your email.");
            }

            setUserEmail(data.email);
            setUserId([userDetails.id]);
            nextStep();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    };

    const onError = (errors) => {
        toast({
            variant: "destructive",
            title: "Invalid Form Submission",
            description: errors,
        });
    };

    return (
        <div className="mt-16 pt-1">
            <p className="text-3xl font-semibold">Contact Details</p>
            <p className="py-2 text-muted-foreground">
                We'll use this information to send you confirmation and updates about your booking.
            </p>

            <div className="my-8">
                <FormWrapper className="flex flex-col gap-6" onSubmit={handleSubmit} onError={onError}>
                    <div className="border p-4 rounded-md mb-4 space-y-2">
                        <p className="text-lg font-semibold py-2">Person</p>

                        <FormInput
                            required
                            id="name"
                            title="Full Name"
                            placeholder="Enter Full Name"
                            className="h-12"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                required
                                id="email"
                                title="Email"
                                placeholder="Enter Your Email"
                                className="h-12"
                            />
                            <FormInput
                                required
                                id="mobile_no"
                                title="Mobile Number"
                                placeholder="Enter Your Mobile Number"
                                className="h-12"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button variant="destructive" className="w-3/5 h-12 rounded-full">
                            Next
                        </Button>
                    </div>
                </FormWrapper>
            </div>
        </div>
    );
};

export default ContactDetailsPage;
