import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useCustomForm from "@/hooks/use-custom-form";
import { reviewsSchema } from "@/lib/schema";
import { addReview } from "@/features/reviews/addServiceReview";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/supabaseConfig";
// import { getUserFromDatabase } from "@/features/getUser";
import { useAuthState } from "@/context/ueAuthContext";

const ServiceCompleted = () => {
  const { user, setUser, setSession, session } = useAuthState();
  const {
    FormWrapper,
    FormInput,
    formState: { isSubmitting },
    reset,
  } = useCustomForm({
    schema: reviewsSchema,
  });

  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //     if (session?.user) {
  //       const fetchUserData = async () => {
  //         const user = await getUserFromDatabase(session?.user.id);
  //         if (user) {
  //           setUser(user);
  //         }
  //       };

  //       fetchUserData();
  //     }
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(async (_event, session) => {
  //     setSession(session);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [session]);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newReview = {
        rating: userRating,
        description: data?.reviews,
        service_id: "92460542-04f7-452b-815c-510449b5b06a",
        user_id: user?.id,
        location: "Malta",
      };

      await addReview(newReview);
      reset();
      fetchReviews();
      setUserRating(0);
    } catch (error) {
      console.error("An unexpected error occurred:", error.message || error);
    } finally {
      setIsLoading(false);
      reset();
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
    <main className="min-h-screen bg-white mx-8 md:mx-20  mt-16">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-8">Write a review</h2>
        <Card>
          <CardContent className="p-6">
            <FormWrapper
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              onError={onError}
            >
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-gray-700">Your rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= userRating
                              ? "fill-red-500 text-red-500"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="">
                  <FormInput
                    id="reviews"
                    title="Write your review"
                    placeholder="Write your review here..."
                    required
                    className={"h-24"}
                  />
                </div>
                <div className="flex gap-8">
                  <Button className="w-32 py-9">
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                  {/* <FileUpload /> */}
                </div>
              </div>
            </FormWrapper>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ServiceCompleted;
