import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useEvents } from "@/features/getEvents";
import Link from "next/link";
import Banner from "@/components/cui/banner";
import CPagination from "@/components/ui/CPagniation";
import { Separator } from "@/components/ui/separator";

const chunkArray = (array, size) => {
  return array?.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);
};

const SIZE = 6;

function RealTimeEvents() {
  const router = useRouter();
  const { query } = router;
  const { data: events, isLoading, isError } = useEvents();
  const [search, setSearch] = useState("");

  const filteredEvents = events?.filter((event) => {
    if (search.trim()) {
      return (
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  const chunkedData = chunkArray(filteredEvents || [], SIZE);
  const currentPage = Math.min(
    Math.max(parseInt(query.page, 10) || 0, 0),
    chunkedData.length - 1
  );

  useEffect(() => {
    if (currentPage >= chunkedData.length && chunkedData.length > 0) {
      router.replace({
        pathname: router.pathname,
        query: { ...query, page: "0" },
      });
    }
  }, [currentPage, chunkedData?.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      {/* Banner */}
      <Banner url="/banner.jpg">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg py-4 text-center">
          MaltaXplore Blog
        </h1>
      </Banner>

      {/* Search Bar - add extra margin-top to push it lower */}
      <div className="flex justify-center mt-16 mb-8">
        <input
          type="text"
          placeholder="Search blogs or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="text-center py-20 text-lg text-gray-500">
            Loading blogs...
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            Failed to load blogs.
          </div>
        ) : filteredEvents?.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No blogs found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(chunkedData[currentPage] || []).map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
                >
                  <div className="h-48 w-full relative">
                    <img
                      src={event.image || "/placeholder-event.jpg"}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-primary group-hover:underline">
                      {event.title}
                    </h3>
                    <span className="inline-block mt-3 text-pink-600 font-medium text-sm group-hover:underline">
                      View Details &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {chunkedData.length > 1 && (
              <>
                <Separator className="my-8" />
                <CPagination
                  className="mx-auto"
                  size={SIZE}
                  data={chunkedData?.map((_, idx) => idx)}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RealTimeEvents;
