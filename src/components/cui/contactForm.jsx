import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, FacebookIcon, TwitterIcon } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import useCustomForm from "@/hooks/use-custom-form";
import { contactFormSchema } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseConfig";

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    FormWrapper,
    FormInput,
    FormSelect,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: contactFormSchema,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: response, error } = await supabase
        .from("contacts")
        .insert(data)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting the form: ", error);
      setLoading(false);
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
    <div className="mx-0 sm:mx-8 md:mx-20 pt-8 px-3">
      <div>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-4 md:p-8 grid lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Form Section */}
            <div className="space-y-6 col-span-2">
              <FormWrapper
                className="flex flex-col gap-4 md:gap-6"
                onSubmit={handleSubmit}
                onError={onError}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <FormInput
                      id="first_name"
                      title="First Name"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      id="last_name"
                      title="Last Name"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormInput
                    id="email"
                    title="Email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    id="phone"
                    title="Phone"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    id="message"
                    title="Message"
                    placeholder="Leave a message for us"
                    required
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-fit self-end bg-red-600 hover:bg-red-700 text-white font-medium py-4 md:py-5 text-lg transition-all duration-300"
                  >
                    {loading ? "Sending..." : "Send Now"}
                  </Button>
                </div>
              </FormWrapper>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Location */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  Our Location:
                </h2>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-red-600" />
                  <p className="text-gray-600">
                    A4 Malta, Triq San Giljan, San Gwann, Malta
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  Contact us:
                </h2>
                <div className="space-y-4">
                  {/* <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5 text-red-600" />
                    <p className="text-gray-600">123-456-789</p>
                  </motion.div> */}
                  <div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <Mail className="w-5 h-5 text-red-600" />
                    <p className="text-gray-600">info@maltaxplore.com</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  Social Links:
                </h2>
                <div className="flex gap-4">
                  {[FacebookIcon, InstagramLogoIcon].map((Icon, index) => (
                    <div key={index}>
                      <a
                        href="https://www.facebook.com/share/15qBjirGZB/?mibextid=wwXIfr"
                        className="rounded-full hover:bg-white/10"
                        target="_blank"
                      >
                        <Icon className="w-5 h-5 text-red-600 cursor-pointer" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
