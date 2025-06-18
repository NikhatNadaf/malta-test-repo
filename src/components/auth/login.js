import * as React from "react";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import { loginSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseConfig";
import { useRouter } from "next/router";

function Login({ redirect = () => {} }) {
  const {
    FormWrapper,
    FormInput,
    formState: { isSubmitting },
  } = useCustomForm({ schema: loginSchema });

  const router = useRouter();
  const { toast } = useToast();
  const { redirectTo } = router.query;

  // Safe redirect function
  const isSafeRedirect = (url) => {
    return url?.startsWith('/') && !url?.startsWith('//');
  };

  const onSubmit = async (values) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      // Successful login redirect
      if (redirectTo && isSafeRedirect(redirectTo)) {
        router.push(decodeURIComponent(redirectTo));
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const onError = () => {
    toast({
      variant: "destructive",
      title: "Invalid Submission",
      description: "Please fill the form correctly",
    });
  };

  return (
    <div className="p-8 flex flex-col">
      <FormWrapper onSubmit={onSubmit} onError={onError} autoComplete="off">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Welcome Back!</h1>
          <h3 className="text-sm text-muted-foreground">
            Enter your email and password below to login
          </h3>
          <br />
          <FormInput
            required
            id="email"
            title="Email"
            type="email"
            placeholder="Type your email here"
            autoComplete="off" // Disable browser autocomplete
            inputMode="email"
          />
          <br />
          <FormInput
            required
            id="password"
            type="password"
            title="Password"
            placeholder="Type your password"
            autoComplete="new-password" // Prevent autofill storing passwords
          />
          <Button onClick={() => redirect("forgetPassword")} className="w-fit self-end p-0" variant="link" type="button">
            Forget Password?
          </Button>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Signing in..." : "Sign In With Email"}
          </Button>
          <Button type="button" className="self-center" variant="link" onClick={() => redirect("signup")}>
            Create an account
          </Button>
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
      </FormWrapper>
    </div>
  );
}

export default Login;
