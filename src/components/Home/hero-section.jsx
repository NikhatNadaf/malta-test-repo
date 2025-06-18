"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselProgress,
} from "@/components/ui/zoom_carousel";
import { useRouter } from "next/navigation";
const categories = [
    { name: "AI For You", icon: "Sparkles" },
    { name: "Stay", icon: "Hotel" },
    { name: "Get Around", icon: "Car" },
    { name: "Tours & Adventures", icon: "Map" }
];

const sampleListings = {
    "Stay": [
        { name: "Grand Hotel Malta", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
        { name: "Sea View Apartments", img: "https://images.unsplash.com/photo-1551887374-9a5dd747e8e3" },
        { name: "Valletta Boutique Suites", img: "https://images.unsplash.com/photo-1590490350334-823db7d8c54e" },
        { name: "Luxury Villa with Pool", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6" }
    ],
    "Get Around": [
        { name: "Private Chauffeur", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d" },
        { name: "Airport Transfers", img: "https://images.unsplash.com/photo-1576502200916-3808e07386a5" },
        { name: "Boat Rentals", img: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de" },
        { name: "Classic Car Tours", img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023" }
    ],
    "Tours & Adventures": [
        { name: "Blue Lagoon Cruise", img: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c" },
        { name: "Gozo Jeep Safari", img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6" },
        { name: "Mdina Walking Tour", img: "https://images.unsplash.com/photo-1623247243346-fc4f6404c4c2" },
        { name: "Underwater Diving", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
    ]
};

const HeroSection = () => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("Stay");
    const [searchQuery, setSearchQuery] = useState("");

    const handleCategoryClick = (catName) => {
        setSelectedCategory(catName);
        setSearchQuery("");
    };

    const filteredListings = useMemo(() => {
        if (!searchQuery.trim()) return sampleListings[selectedCategory];
        return sampleListings[selectedCategory].filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, selectedCategory]);

    return (
        <>
            {/* Hero Banner */}
            <section className="relative w-full overflow-hidden shadow-lg">
                <Image
                    src="/hero-couple-malta.png"
                    alt="Young couple in Malta"
                    width={1920}
                    height={900}
                    className="w-full h-[65vh] md:h-[75vh] lg:h-[80vh] object-cover object-center"
                    priority
                />

                {/* Left-aligned text */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-start px-4 md:px-16">
                    <div className="text-white max-w-3xl">
                        <p className="font-semibold text-sm md:text-base bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
                            Discover Malta In One Place
                        </p>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
                            Explore Malta's Best Experiences
                        </h1>
                        <p className="text-sm md:text-lg text-white/80 mb-4">
                            Tours, food, nightlife, adventures & hidden gems — all inside one app.
                        </p>
                        <div className="flex items-center bg-white/90 rounded-lg shadow-sm w-full max-w-md">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search..."
    className="flex-1 bg-transparent border-none px-4 py-3 text-black text-base focus:outline-none"
  />
  <button
    type="button"
    className="p-2 pr-4 text-primary hover:text-pink-600 focus:outline-none"
    onClick={() => {
      if (searchQuery.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      }
    }}
    aria-label="Search"
  >
    <Icons.Search className="w-5 h-5" />
  </button>
</div>

                    </div>
                </div>

                {/* Solid White Tab Section */}
                <div className="absolute bottom-0 w-full bg-white">
                    <div className="flex justify-center gap-6 max-w-7xl mx-auto">
                        {categories.map((cat) => {
                            const IconComponent = Icons[cat.icon] || Icons.Circle;
                            const isSelected = selectedCategory === cat.name;
                            const isAiComingSoon = cat.name === "AI For You";

                            return (
                                <button
                                    key={cat.name}
                                    disabled={isAiComingSoon}
                                    onClick={() => handleCategoryClick(cat.name)}
                                    className={`flex flex-col items-center px-4 py-3 transition relative 
                    ${isSelected ? "text-white font- bg-primary" : "text-black/70"} 
                    ${isAiComingSoon ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-0 left-0 right-0 h-[5px] rounded-t-xl bg-primary -translate-y-full "></div>
                                    )}
                                    <IconComponent className="h-5 w-5 mb-1" />
                                    <span className="text-sm">{cat.name}</span>

                                    {isAiComingSoon && (
                                        <span className="absolute -top-2 right-2 bg-pink-500 text-white text-[10px] px-2 py-[1px] rounded-full shadow">
                                            Soon
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
                {filteredListings.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10 text-lg">No results found.</div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">{selectedCategory} Suggestions</h2>

                        <div className="relative mt-10 max-w-7xl mx-auto">
                            <Carousel
                                opts={{ align: "center" }}
                                setApi={(api) => {
                                    if (!api) return;
                                    setScrollSnaps(api.scrollSnapList());
                                    setCurrentIndex(api.selectedScrollSnap());

                                    api.on("select", () => {
                                        setCurrentIndex(api.selectedScrollSnap());
                                    });
                                }}
                            >
                                <div className="overflow-hidden">
                                    <CarouselContent className="flex gap-2 lg:gap-2  scroll-smooth">
                                        {filteredListings.map((item, idx) => (
                                            <CarouselItem
                                                key={item.id || idx}
                                                index={idx}
                                                className="
                                        flex-none
                                        
                                        sm:w-fit
                                        md:w-fit
                                        lg:w-fit
                                        xl:w-fit
                                        "
                                            >
                                                <div key={idx} className="flex gap-">

                                                    <article className="text-center overflow-hidden w-fit relative cursor-pointer">
                                                        <img src={item.img} alt={item.name} className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg" />
                                                        <div className="py-2 px-3">
                                                            <h3 className="font-semibold text-sm text-primary">{item.name}</h3>
                                                        </div>
                                                    </article>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </div>

                                <CarouselPrevious
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-2 md:ml-4"
                                    disabled={currentIndex === 0}
                                />
                                <CarouselNext
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-2 md:mr-4"
                                    disabled={currentIndex >= scrollSnaps.length - 1}
                                />
                            </Carousel>
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default HeroSection;
