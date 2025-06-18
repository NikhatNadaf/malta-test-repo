import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/supabaseConfig";
import { signupSchema } from "@/lib/schema";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";



function Signup({ redirect = () => {} }) {
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [agreed, setAgreed] = useState(false);


  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: signupSchema,
  });
  const { toast } = useToast();

  async function onSubmit(values) {
    try {
      const auth = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.href}/`,
        },
      });

      if (auth.error) {
        console.error(auth.error);
        toast({
          variant: "destructive",
          title: auth.error["details"],
        });
        return;
      }

      reset();
      setShowVerificationAlert(true);
      toast({
        variant: "success",
        title: "Account Created Successfully",
        description:
          "Please check your email to verify your account. Your profile is pending admin verification.",
      });

      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        redirect("login");
      }, 5000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  const onError = (errors) => {
    toast({
      variant: "destructive",
      title: "Invalid Form Submission",
      description: "Please check the form for errors and try again.",
    });
    console.error(errors);
  };
  return (
    <ScrollArea className="h-full w-full">
      {/* Signup Form */}
      <div className="flex flex-col p-8">
        {showVerificationAlert && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              Your account has been created and is pending admin verification.
              You'll be redirected to the dashboard where you can track your
              verification status. Please also check your email to verify your
              email address.
            </AlertDescription>
          </Alert>
        )}

        <FormWrapper onSubmit={onSubmit} onError={onError}>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Create An Account</h1>
            <h3 className="text-sm text-muted-foreground">
              Join Malta's Leading Tourism Platform
            </h3>
            <br />
            <FormInput
              required
              id="personName"
              title="Full Name"
              placeholder="Enter your full name"
            />
            <div className="my-1" />
            <FormInput
              required
              id="email"
              type="email"
              title="Email Address"
              placeholder="Enter your email address"
            />
            <div className="my-1" />
            <FormInput
              required
              id="password"
              type="password"
              title="Password"
              placeholder="Enter a strong password"
            />
            <div className="my-1" />
            <FormInput
              required
              id="confirmPassword"
              type="password"
              title="Confirm Password"
              placeholder="Confirm your password"
            />
            <div className="my-1" />
            <FormInput
              required
              id="contactNumber"
              title="Contact Number"
              placeholder="Enter your contact number (e.g., +35699123456)"
            />
            <div className="my-1" />
            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I have read and agree to the{" "}
                <Link href="/terms-and-conditions" target="_blank" className="underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" target="_blank" className="underline">
                  Privacy Policy
                </Link>.
              </label>
            </div>
            <div className="my-1" />
            <Button disabled={isSubmitting || !agreed} type="submit" className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <Button
              type="button"
              className="self-center"
              variant="link"
              onClick={() => redirect("login")}
            >
              Login
            </Button>
            {isSubmitting && (
              <p className="text-sm text-center text-muted-foreground mt-2">
                Please wait while we set up your account. This may take a few
                moments.
              </p>
            )}
          </div>
        </FormWrapper>
          <p className="text-sm text-center text-muted-foreground mt-4">
            By clicking continue, you agree to our{" "}
            <Button asChild className="p-0 text-muted-foreground" variant="link" type="button">
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            </Button>{" "}
            and{" "}
            <Button asChild className="p-0 text-muted-foreground" variant="link" type="button">
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </Button>.
          </p>
      </div>
    </ScrollArea>
  );
}

export default Signup;
