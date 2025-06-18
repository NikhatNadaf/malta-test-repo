import React from "react";
import HeroSection from "@/components/Home/hero-section";
import TopPicks from "@/components/Home/topPicks";
import useFetchServices from "@/features/getAllServices";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const { data: services, isLoading } = useFetchServices();
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/search?page=-1");
  };

  return (
    <main className="relative">
      {/* ✅ Hero Section */}
      <HeroSection />

      <div className="p-4">
        {/* ✅ Category Section */}
        <section className="w-full py-10 px-4 lg:px-20 text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
            Browse by Experience Type
          </h2>

          <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-2xl mx-auto">
            Whether you're seeking thrills, history, or relaxation — explore categories to match your perfect Maltese adventure.
          </p>

          <div className="flex justify-center">
            <Button
              className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primary/90 transition"
              onClick={handleRedirect}
            >
              Explore All Categories
            </Button>
          </div>
        </section>

        {/* ✅ Top Picks Section */}
        <TopPicks
          heading={"Top Picks for Your Maltese Adventure"}
          services={services}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
