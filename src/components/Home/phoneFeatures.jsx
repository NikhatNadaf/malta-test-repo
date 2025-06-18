import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { search } from "@/data/link";
import Tilt from "react-parallax-tilt";
import VideoPlayer, { Iphone15ProDemo } from "../cui/video-component";

const PhoneFeatures = () => {
  const FeatureCard = ({ title = "", desc = "" }) => (
    // <Tilt>
    <Card className="max-w-[350px] text-left max-lg:w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="shadow-md border rounded-full p-2">
            <CodeSandboxLogoIcon />
          </div>
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
    </Card>
    // </Tilt>
  );
  return (
    <div className="lg:p-8 lg:pb-5 pt-10 md:pt-16 relative text-center cut_corner">
      <img
        src="images/curve_line.svg"
        className="md:absolute z-[-1] h-full w-full object-scale-down md:block hidden"
      />
      <p className="text-4xl md:text-5xl font-bold">Why Choose MaltaXplore?</p>
      <div className="grid lg:grid-cols-3 lg:mt-16 mt-8 items-stretch place-items-center">
        <div className="flex items-center flex-col gap-8 h-full">
          <FeatureCard
            title="All-in-One Platform"
            desc="Manage everything effortlessly with our all-in-one platform, offering powerful tools and seamless functionality."
          />
          <FeatureCard
            title="Seamless Booking Process"
            desc="Enjoy a smooth and hassle-free booking experience with an intuitive interface and simple navigation. Secure your bookings."
          />
          {/* <Tilt> */}
          <Image
            src="/images/pool.jpg"
            className="object-cover rounded-[2rem] relative h-64 w-full lg:w-64"
            loading="lazy"
            width={200}
            height={200}
          />
          {/* </Tilt> */}
        </div>
        <div className="max-md:flex max-md:items-center max-md:flex-col mt-8 lg:mt-0">
          <div className="md:w-full w-[90%] md:h-[600px]">
            <Iphone15ProDemo path={"Phone-Section.mp4"} />
          </div>
          <br />
          <Button asChild size="lg" className="w-fit">
            <Link href={search}>Start Exploring</Link>
          </Button>
        </div>
        <div className="flex items-center flex-col gap-8 mt-8 lg:mt-0 h-full">
          {/* <Tilt> */}
          <Image
            src="/images/malta_banner.jpg"
            className="object-cover rounded-[2rem] relative h-64 w-full lg:w-64"
            loading="lazy"
            width={200}
            height={200}
          />
          {/* </Tilt> */}

          <FeatureCard
            title="Comprehensive Service Selection"
            desc="We offer guided tours, car rentals, and accommodation options, all in one convenient platform."
          />
          <FeatureCard
            title="Diverse and Specialized Options"
            desc="From unique adventure activities like rock climbing to specialized business venues, our platform caters to all your travel needs."
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneFeatures;
