import React, { useEffect } from "react";
import UserWrapper from "./_app";
import { useAuthState } from "@/context/ueAuthContext";
import useCustomForm from "@/hooks/use-custom-form";
import { contactFormSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseConfig";
import Link from "next/link";

const Settings = () => {
    const { user, setUser } = useAuthState();
    const {
        FormWrapper,
        FormInput,
        FormSelect,
        formState: { isSubmitting },
        setValue,
    } = useCustomForm({
        schema: contactFormSchema,
        defaultValues: {
            name: user?.name,
            email: user?.email,
            mobile_no: user?.mobile_no,
            // message: "",
        },
    });

    useEffect(() => {
        if (user) {
            setValue("name", user?.name || "");
            setValue("email", user?.email || "");
            setValue("mobile_no", user?.mobile_no || "");
        }
    }, [user, setValue]);

    const handleSubmit = async (data) => {
        try {
            const { data: updatedData, error } = await supabase
                .from("users")
                .upsert(
                    {
                        id: user.id,
                        email: data.email,
                        name: data.name,
                        mobile_no: data.mobile_no,
                    },
                    { onConflict: ["id"] }
                )
                .select();
            if (error) {
                console.error("Error updating user:", error);
                return;
            }
            console.log("Updated user:", updatedData);
        } catch (error) {
            console.error("Error during submit:", error);
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
        <UserWrapper>
            <div className="max-w-2xl mx-auto">
                <div className="flex flew-wrap items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Account Setting
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your account preferences
                        </p>
                    </div>
                    <div>
                        <Button
                            size="sm"
                            asChild
                            className="w-full lg:w-auto lg:mr-2"
                            onClick={() => { }}
                        >
                            <Link href="/user/update-password">Update Password</Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <FormWrapper
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        onError={onError}
                    >
                        <div className="grid gap-6">
                            <FormInput
                                id="name"
                                title="Full Name"
                                placeholder="Your full name"
                                required
                                className="h-11 rounded-lg border-gray-200 focus:border-blue-500"
                            />

                            <FormInput
                                id="email"
                                title="Email Address"
                                placeholder="your.email@example.com"
                                required
                                className="h-11 rounded-lg border-gray-200 focus:border-blue-500"
                            />

                            <FormInput
                                id="mobile_no"
                                title="Phone Number"
                                placeholder="+1 (555) 000-0000"
                                required
                                className="h-11 rounded-lg border-gray-200 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button
                                variant="destructive"
                                type="submit"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </FormWrapper>
                </div>
            </div>
        </UserWrapper>
    );
};

export default Settings;
