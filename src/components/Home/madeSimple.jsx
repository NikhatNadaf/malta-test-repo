import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { search } from "@/data/link";

const MadeSimple = () => {
  return (
    <div className="bg-[#f6f6f6] py-8 px-6 lg:px-16 rounded-3xl">
      {/* Heading */}
      <div className="mb-7 text-center">
        <p className="text-3xl font-bold text-black tracking-tight">
          Booking Made Simple
        </p>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          We've made it easy to book your next adventure
        </p>
      </div>

      {/* Custom Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4 gap-6 lg:gap-6 mb-16">
        {/* Browse Section */}
        <div className="bg-white p-6 rounded-3xl col-span-2 flex flex-col justify-between">
          <p className="text-2xl font-bold text-black">Browse</p>
          <p className="text-muted-foreground mt-2">
            Discover countless travel experiences tailored to your interests.
          </p>
          <Button variant="outline" className="mt-4 w-fit"><Link href={search}>Explore</Link></Button>
        </div>

        <div className="relative h-[290px] rounded-3xl overflow-hidden col-span-2">
           <Image
            src="https://media-hosting.imagekit.io/57bdfa7b81b941f3/enjoy.jpg?Expires=1841731634&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=NGpWdUYWzkicoEXMraBI0UsVvzu-K3P33bgPnRaDU3v8ntt~dSZnzUecRZg1u9Ul3feASyAQDS0Pyffj2b33FhRlfSZFzjZ3X1ko3rL0-BeGEu8B-bgCSSM7kR5HkAcwpzqbitOMaSnIKGWZpkA6isb~1XDReGgiXZMDKdkWxNf5gXQuOgAStYKnxQtqG2CReFZbBRD6VOhR3wfvSmzJb9V70PgFwhqVKI3pw8zbA7MazWYh0UC0pb5K-LcpTnfJC8JgJojuHoGj7P3ir6EoK-TE3GcX6rUmzNxqtBGJypRTYpLTOvQbU4bwJDYsOrMdWtmee~1OhEE2J62ng~9LJQ__"
            alt="Enjoy Travel"
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-white p-6 rounded-3xl col-span-2 flex flex-col justify-between">
          <p className="text-2xl font-bold text-black">Book</p>
          <p className="text-muted-foreground mt-2">
            Secure your travel plans quickly and easily with our platform.
          </p>
        </div>

        {/* Enjoy Section */}
        <div className="relative h-[250px] rounded-3xl overflow-hidden col-span-2">
          <Image
           src="https://media-hosting.imagekit.io/90a88c8e40f44b01/travelling_booking.webp?Expires=1841731124&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=3Fh0B46h558Gztff91Jgyu12XSr2E-d3paMV5aDIwqZ6qSGiPyp-umab-27cNFbSPpGYUA9mUXbHaQS4dhDGrs4vP~Cyk6EXqYq6dqePXqR66vXH5hFHwvA12o7EDH1lUyhtGL8m3FfURYXONClWwFZH9qL05CvmuaRgORXJswrtrnaK6Vnv-DQH4SgUODpGDMbQerje7u9Jy1iSZeIWTBKHEjmR-PlcTf6PKdt4FnR2ZWGoL83vC9Zy9x7s-IhNoKVM7LkPlElFTj-VF-KeMDm~QqR6UVlH1qznR7EglGsmpii8Rx5AMfe-mHokpbcriUAa0QDTemwQ8ezAbXexpw__"
            alt="Booking Travel"
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-white p-6 rounded-3xl col-span-2 flex flex-col justify-between">
          <p className="text-2xl font-bold text-black">Enjoy</p>
          <p className="text-muted-foreground mt-2">
            Relax and make the most of your trip with top-rated experiences.
          </p>
        </div>

        <div className="relative h-[250px] rounded-3xl overflow-hidden col-span-2">
         
          <Image
            src="https://media-hosting.imagekit.io/1c806b90d3b140ab/booking.jpg?Expires=1841731347&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=s7idgb477I9L4ixxrzqWJGgJ0f66WdSC1N2sjAqZb3fL4KJ9Sy1c9iM1laoTP7t-gCE7m2frGXQ06wXubiVD88P2PxDGlyN8zfWrce5BejSC3x8cfOU5IPKVokSIK1DchM-8JwP0hJyPkFzGRVR7O1aAcRIzlTh1p3KbiYTVqO8H1nujAohMBsjnLzr2IsYdL23BA23S2xvFtmd8rhHu-cH045U1fJXAQpaMIjhaqEXVhHg-BojO8mU168WTQUff0Je9ZSkj6VG1X1hMtM4a2CFgNBiHnv5AnJpY0uSK-nu-7~EAlZRdkN2jkhm769DfBSdSodjNqxoo2VpC6fuuTw__"
            alt="Browsing Destinations"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6">
        <p className="text-muted-foreground text-base">
          <strong>Need Help?</strong> Use our <strong>Live Chat</strong> for
          real-time assistance with any questions or bookings.
        </p>
        <Button size="lg" asChild className="px-8 py-5 rounded-lg text-lg">
          <Link href={search}>Start Exploring</Link>
        </Button>
      </div>
    </div>
  );
};

export default MadeSimple;
