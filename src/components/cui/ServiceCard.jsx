// ServiceCard.jsx

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAuthState } from "@/context/ueAuthContext";
import { useServicesState } from "@/context/servicesContext";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/supabaseConfig";
import { tourListing } from "@/data/link";
import { useServiceReviews } from "@/features/reviews/getServiceReviews";

export const ServiceCard = ({ data, loading, likes }) => {
  const { user } = useAuthState();
  const { likeService, unlikeService } = useServicesState();
  const [isLiked, setIsLiked] = useState(false);
  const [priceToShow, setPriceToShow] = useState(null);
  const [priceLabel, setPriceLabel] = useState("per person");
  const [groupSizeRange, setGroupSizeRange] = useState("");

  useEffect(() => {
    setIsLiked(likes?.some((like) => like.service_id === data.id));
  }, [likes, data.id]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (loading || !data) return;

      const parseGroup = (groupSize) => {
        let g = Array.isArray(groupSize) ? groupSize : [];
        if (typeof groupSize === "string") {
          try {
            g = JSON.parse(groupSize);
          } catch {
            g = groupSize.split(",");
          }
        }
        if (g[0] === "0" && g[1] === "0") {
          setPriceLabel("per person");
          setGroupSizeRange("");
        } else {
          setPriceLabel("group size");
          setGroupSizeRange(`(${g[0]}–${g[1]})`);
        }
      };

      try {
        if (data.price != null) {
          setPriceToShow(data.price);
          setPriceLabel("per person");
          return;
        }

        const { data: fallback } = await supabase
          .from("pricebygroupsize")
          .select("price, group_size")
          .eq("service_id", data.id)
          .order("price", { ascending: true })
          .limit(1)
          .single();

        if (fallback?.price) {
          setPriceToShow(fallback.price);
          parseGroup(fallback.group_size);
        } else {
          setPriceToShow("N/A");
        }
      } catch {
        setPriceToShow("N/A");
      }
    };

    fetchPrice();
  }, [data, loading]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      if (isLiked) {
        await unlikeService(data, user.id);
        setIsLiked(false);
      } else {
        await likeService(data, user.id);
        setIsLiked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  let imageUrl = "";
  try {
    const raw = data.images?.[0];
    const parsed = JSON.parse(raw);
    imageUrl = parsed?.url?.startsWith("@") ? parsed.url.slice(1) : parsed.url;
  } catch {}

  const { data: reviews = [] } = useServiceReviews(data.id);
  const total = reviews.length;
  const avg = total ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : 0;

  const fallbackImg = `https://picsum.photos/400/240?random=${data.id}`;
  const src = imageUrl || data.image || fallbackImg;

  return (
    <Link href={tourListing.replace("[id]", data.id)}>
      <Card className="rounded-2xl pb-3 shadow-sm border-gray-200 bg-white relative overflow-hidden h-full">
        <div className="relative">
          <Image
            src={src}
            alt={data.name}
            height={500}
            width={400}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute z-10 top-2 right-2 cursor-pointer transition-transform duration-200 transform hover:scale-110">
            <Button
              variant="outline"
              className="rounded-full w-8 h-8 p-0 text-primary hover:text-primary hover:bg-white text-xs"
              onClick={handleLike}
            >
              <Heart width={20} height={20} className={cn(isLiked && "fill-primary text-primary")} />
            </Button>
          </div>
        </div>

        <CardContent className="px-3 space-y-2 pt-3">
          <h3 className="text font-semibold text-black w-full line-clamp-2 h-12 mt-0">
            {data.name || "Untitled"}
          </h3>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(avg)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-gray-600">({total})</span>
          </div>

          <p className="text-muted-foreground text-xs line-clamp-2 min-h-[32px]">
            {data.description || "No description"}
          </p>

          {priceToShow && (
            <div className="text-base text-gray-800 font-normal">
              <span className="text-primary font-bold">€ {priceToShow}</span>{" "}
              <span className="ps-1 text-sm">
                {priceLabel} {groupSizeRange}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
