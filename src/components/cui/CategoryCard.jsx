import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";

const CategoryCard = ({ data }) => {
  console.log("category card data", data);
  return (
    <Link href={`${data?.id}`}>
      <Card className="group rounded-3xl  bg-white border-none shadow-none">
        {/* Image */}
        <div className="relative h-[380px] w-full ">
          <Image
            src={data?.image ?? "/fallback.jpg"}
            alt={data?.name}
            fill
            className="object-cover rounded-3xl transition-transform duration-300 "
          />
        </div>

        {/* Name */}
        <div className="pt-3">
          <p className="text-sm font-semibold text-center text-black line-clamp-1">{data?.name}</p>
        </div>
      </Card>
    </Link>
  );
};


export default CategoryCard;
