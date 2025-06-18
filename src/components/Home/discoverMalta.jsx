import React from "react";
import Link from "next/link";
import Image from "next/image";
import { search } from "@/data/link";
import { Button } from "@/components/ui/button";
import Weather from "@/components/Home/Weather";

const DiscoverMalta = () => {
  return (
    <div className="md:px-32 xl:px-20 max-lg:flex max-lg:flex-col">
      <div className="lg:relative max-lg:order-2">
        <Image
          className="w-full max-lg:hidden"
          src={"/home.png"}
          loading="lazy"
          height={1000}
          width={1000}
        />
        <div className="lg:absolute w-full right-10 top-8 space-y-8">
          <div className="lg:flex lg:items-end lg:justify-end w-full h-full lg:h-[70vh] gap-6 max-lg:space-y-4 max-lg:px-8 z-50">
            <Image
              src="/images/malta_banner.jpg"
              className="object-cover rounded-[2rem] lg:relative h-auto lg:h-40 w-full lg:w-40 top-8 lg:hidden"
              loading="lazy"
              width={200}
              height={200}
            />
            {/* <Image
              src="/images/malta_hero.jpg"
              className="object-cover h-[40vh] lg:relative w-full lg:w-[15vw] rounded-[2rem] max-lg:hidden top-3"
              loading="lazy"
              width={200}
              height={200}
            /> */}
            <Weather />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 m-6 md:px-4">
          <div className="mb-12 pb-8">
            <Image
              src="/images/gozo.jpg"
              className="w-full p-2 md:ml-5 rounded-[3.5rem] lg:relative object-cover h-[400px] lg:h-[65vh] top-12 left-0 lg:hidden"
              loading="lazy"
              width={2000}
              height={2000}
            />
            <Button
              className="relative text-white bottom-20 max-lg:left-10 text-2xl"
              variant="link"
              asChild
            >
              <Link href={search}>Explore Malta Verse</Link>
            </Button>
          </div>
          <div>
            <Image
              src="/images/lady.png"
              className="object-cover lg:absolute right-0 bottom-36 pl-32 max-lg:hidden w-[900px]"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
      <div className="lg:top-0 flex lg:absolute lg:pt-32 max-lg:my-20 max-lg:order-1 max-md:justify-center px-8 lg:px-0">
        <div>
          <p className="font-semibold text-xl text-primary">
            Discover Malta In One Place
          </p>
          <br />
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.3] font-bold">
            Discover Malta's Best <br /> Experiences
          </h1>
          <br />
          <p className="text-lg lg:text-xl leading-[1.5]">
            From tours and adventures to dining and relaxation, <br />
            find everything you need for the perfect trip to Malta - all
            <br />
            in one place
          </p>
          <br />
          <Button asChild size="lg" className="md:p-8">
            <Link href={search}>Start Your Journey</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMalta;
