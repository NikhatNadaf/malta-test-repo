import * as React from "react";
import { Button } from "@/components/ui/button";
import useCustomForm from "@/hooks/use-custom-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseConfig";
import { forgetPasswordSchema } from "@/lib/schema";

function ForgotPassword({ redirect = () => {} }) {
  const {
    FormWrapper,
    FormInput,
    formState: { isSubmitting },
  } = useCustomForm({
    schema: forgetPasswordSchema,
  });

  const { toast } = useToast();
  
  const onSubmit = async (val) => {
    const values = forgetPasswordSchema.parse(val);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      val.email,
      {
        redirectTo: `${window.location.origin}/user/update-password`,
      }
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
        toast({
			variant: "destructive",
            title: "Success",
            description: "Password reset email has been sent",
        });
        window.location.href = `${window.location.origin}/user/dashboard?auth=login`;
      }
  };

  const onError = (data) => {
    toast({
      variant: "destructive",
      title: "Invalid Submission",
      description: "Please fill the form correctly",
    });
    console.error(data);
  };

  return (
    <div className="">
      <FormWrapper onSubmit={onSubmit} onError={onError}>
          <div className="flex flex-col gap-1 mx-8">
            <h1 className="text-2xl font-semibold">Forgot Password</h1>
            <h3 className="text-sm text-muted-foreground">
              Enter your email to continue
            </h3>
            <br />
            <FormInput
              id="email"
              title="Email"
              placeholder="Type your email here"
            />
            <br />
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Send Reset Link
            </Button>
            <Button
              type="button"
              className="self-center"
              variant="link"
              onClick={() => redirect("login")}
            >
              Login
            </Button>
          </div>
      </FormWrapper>
    </div>
  );
}

export default ForgotPassword;
