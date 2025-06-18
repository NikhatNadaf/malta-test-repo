import React, { useEffect } from "react";
import UserWrapper from "./_app";
import useCustomForm from "@/hooks/use-custom-form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseConfig";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const UpdatePassword = () => {
    const { toast } = useToast();
    const {
        FormWrapper,
        FormInput,
        formState: { isSubmitting },
        reset,
    } = useCustomForm({});

    const UpdatePwdSchema = z
        .object({
            password: z.string().min(6),
            confirmPassword: z.string(),
        })
        .refine((d) => d.password === d.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });

    const handleSubmit = async (val) => {
        const parsed = UpdatePwdSchema.safeParse(val);
        if (!parsed.success) {
            const firstErr = parsed.error.issues[0];
            toast({
                variant: "destructive",
                title: "Validation error",
                description: firstErr.message,
            });
            return;
        }
        try {
            const { error } = await supabase.auth.updateUser({
                password: val.password,
            });
            if (error) {
                console.error("Error updating Password:", error);
                toast({
                    variant: "destructive",
                    title: "Error updating password",
                    description: error.message,
                });
                return;
            }

            reset();

            toast({
                variant: "default",
                title: "Password updated : ",
                description: "Your password has been updated. Please login again.",
            });
              await supabase.auth.signOut();
            // router.push("/user/update-password");
            router.push("/user/dashboard?auth=login");
        } catch (error) {
            console.error("Error during submit:", error);
        }
    };

    const onError = (errors) => {
        toast({
            variant: "destructive",
            title: "Invalid Form Submission",
            description: "Please try again later!",
        });
        console.error(errors);
    };

    return (
        <UserWrapper>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Update Password
                    </h1>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <FormWrapper
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        onError={onError}
                    >
                        <div className="grid gap-6">
                            <FormInput
                                required
                                id="password"
                                type="password"
                                title="New Password"
                                placeholder="Enter a strong password"
                            />
                            <FormInput
                                required
                                id="confirmPassword"
                                type="password"
                                title="Confirm Password"
                                placeholder="Re-enter your password"
                            />
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button
                                variant="destructive"
                                type="submit"
                            >
                                Update Password
                            </Button>
                        </div>
                    </FormWrapper>
                </div>
            </div>
        </UserWrapper>
    );
};

export default UpdatePassword;
