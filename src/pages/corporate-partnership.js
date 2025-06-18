import Banner from "@/components/cui/banner";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import SupplierRegistration from "./supplier-registration";

const CorporatePartnership = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="pt-16 md:pt-0">
          <Banner url="/corporate-partnership.png">
            <h1 className="text-xl md:text-4xl font-bold text-white">
              Corporate Partnerships
            </h1>
          </Banner>
        </div>

        {/* Welcome Section */}
        <section className="relative py-12 md:py-24">
          <div className="mx-8 md:mx-32 md:px-4 flex flex-col lg:flex-row lg:justify-center lg:items-center  lg:gap-24 ">
            {/* Left content */}
            <div className="w-full lg:w-1/2 md:pr-8 max-md:px-8">
              <h1 className="text-2xl md:text-3xl md:text-4xl font-bold mb-6">
                Partner with MaltaXplore
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Join forces with MaltaXplore, the premier platform for
                showcasing the unique beauty and experiences of Malta. Whether
                you're a hotel, travel agency, event organizer, or local
                business, partnering with MaltaXplore means reaching a global
                audience of eager travelers looking for authentic Maltese
                adventures.
              </p>
            </div>

            {/* Right images grid */}
            <div className="w-full lg:w-1/2 relative h-[600px] mt-16">
              {/* Top right image */}
              <div className="absolute right-0 top-0 w-[80%] h-[80%] md:w-[70%] md:h-[90%] rounded-2xl overflow-hidden z-20">
                <img
                  src="/malta-arial-view.png"
                  alt="Malta aerial view"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top left floating image */}
              <div className="absolute left-0 md:left-16 top-[10%] w-[45%] h-[40%] md:w-[40%] md:h-[30%] rounded-2xl overflow-hidden z-30 shadow-xl bg-white p-2">
                <img
                  src="/malta-church.png"
                  alt="Malta church"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Bottom left floating image */}
              <div className="absolute left-[10%] md:left-[0%] bottom-[10%] md:bottom-[18%] w-[45%] h-[40%] rounded-2xl overflow-hidden z-30 shadow-xl bg-white p-2">
                <img
                  src="malta-harbor.png"
                  alt="Malta harbor"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="relative py-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-12 text-center max-md:px-4">
            Benefits of Partnering with MaltaXplore
          </h1>
          <div className="mx-8 lg:mx-32 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "Enhanced Visibility",
                description:
                  "Showcase your services on a platform dedicated to promoting Malta’s top experiences, reaching thousands of potential customers daily.",
              },
              {
                id: 2,
                title: "Targeted Marketing",
                description:
                  "Leverage our tailored marketing strategies to connect with your ideal audience, whether they’re leisure travelers, adventurers, or business tourists.",
              },
              {
                id: 3,
                title: "Collaborative Opportunities",
                description:
                  "Work closely with our team to co-create campaigns, packages, or events that amplify your brand’s reach and impact.",
              },
              {
                id: 4,
                title: "Credibility and Trust",
                description:
                  "Align your brand with MaltaXplore’s trusted reputation as a reliable and informative travel resource.",
              },
            ].map((benefit) => (
              <Card key={benefit.id} className="shadow-lg rounded-lg">
                <CardContent className="flex gap-4 md:items-center">
                  <div className="text-primary text-5xl md:text-7xl font-semibold">
                    {String(benefit.id).padStart(2, "0")}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">{benefit.title}</h4>
                    <p className="text-sm">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Case studies */}
        <section>
          <div className="p-8 md:py-32 relative text-center bg-red-100 mt-32 cut_corner">
            <img
              src="images/curve_line.svg"
              className="md:absolute z-[-1] h-full w-full object-scale-down"
              alt="decorative curve"
            />
            <p className="text-4xl md:text-5xl font-bold">
              Case Studies: Success Stories
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mx-8 md:mx-32 mt-12 place-items-center">
              {[
                {
                  id: 1,
                  title: "Blue Lagoon Hotel",
                  description:
                    "Partnering with MaltaXplore increased their bookings by 40% during the peak season through featured listings and curated travel packages.",
                  image: "/hill-view.png",
                  alt: "festival img",
                  additionalClasses: "lg:mt-12",
                },
                {
                  id: 2,
                  title: "AdventureGo Tours",
                  description:
                    "After joining MaltaXplore, this local tour operator saw a 25% increase in online inquiries and collaborated with us on a best-selling “hidden gems” tour series.",
                  image: "/river-hill.png",
                  alt: "festival img",
                  additionalClasses: "lg:mb-12",
                },
                {
                  id: 3,
                  title: "Malta Festivities",
                  description:
                    "Our collaboration helped this event organizer triple their ticket sales for cultural festivals by leveraging MaltaXplore’s audience and promotional channels.",
                  image: "/festival.png",
                  alt: "festival img",
                  additionalClasses: "lg:mt-12",
                },
              ].map(
                ({
                  id,
                  title,
                  description,
                  image,
                  alt,
                  additionalClasses = "",
                }) => (
                  <Card
                    key={id}
                    className={`rounded-lg w-[350px] ${additionalClasses}`}
                  >
                    <div>
                      <Image
                        width={500}
                        height={500}
                        className="rounded-lg p-4 h-64 object-cover"
                        src={image}
                        alt={alt}
                        loading="lazy"
                      />
                    </div>
                    <div className="my-2 space-y-2 px-6 text-left">
                      <p className="text-lg font-bold line-clamp-1">{title}</p>
                      <p className="text-base">{description}</p>
                      <p className="text-primary font-bold text-base">
                        See Full Case study
                      </p>
                    </div>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>

        {/* Become a Partner */}
        <section className="relative py-12 md:py-24 mx-8 md:mx-28">
          <div className="lg:relative max-lg:space-y-8">
            {" "}
            <Image
              width={500}
              height={500}
              className="rounded-lg p-4 h-64 object-cover w-full h-full max-lg:hidden"
              src="/become-partner-union.png"
              alt="union png"
              loading="lazy"
            />

            {/* center */}
            <div className="lg:absolute top-16 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-64 text-center space-y-4 max-lg:px-4">
              <h1 className="font-bold text-4xl text-center">
                Become a Partner
              </h1>
              <p>
                We’re excited to collaborate with businesses that share our
                vision for promoting Malta as a world-class travel destination
              </p>
            </div>

            {/* top-left */}
            <div className="lg:absolute top-28 lg:w-80 left-20 text-center space-y-4 max-lg:px-4">
              <h1 className="font-semibold text-xl text-center">
                Fill Out the Partnership Registration Form
              </h1>
              <p>
                We’re excited to collaborate with businesses that share our
                vision for promoting Malta as a world-class travel destination
              </p>
            </div>

            {/* top-right */}
            <div className="lg:absolute top-28 lg:w-80 right-20 text-center space-y-4 max-lg:px-4">
              <h1 className="font-semibold text-xl text-center">
                Start Growing Together
              </h1>
              <p>
                Upon approval, we’ll work with you to create customized
                listings, promotions, and campaigns to showcase your services to
                a global audience.
              </p>
            </div>

            {/* bottom-center */}
            <div className="lg:absolute bottom-32 lg:w-80 left-1/2 lg:-translate-x-1/2 text-center space-y-4 max-lg:px-4">
              <h1 className="font-semibold text-xl text-center">
                Connect with Our Team
              </h1>
              <p>
                Once submitted, our team will review your application and
                schedule a meeting to discuss opportunities tailored to your
                goals.
              </p>
            </div>

            {/* bottom-left */}
            <div className="lg:absolute bottom-8 left-2">
              <Image
                width={700}
                height={700}
                className="rounded-lg p-4 h-64 object-cover w-full h-full"
                src="/peoples.png"
                alt="union png"
                loading="lazy"
              />
            </div>

            {/* bottom-right */}
            <div className="lg:absolute bottom-8 right-6">
              <Image
                width={500}
                height={500}
                className="rounded-lg p-4 h-64 object-cover w-full h-full"
                src="/ocean.png"
                alt="union png"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Supplier registration */}
        <section className="">
          <SupplierRegistration />
        </section>
      </main>
    </div>
  );
};

export default CorporatePartnership;
