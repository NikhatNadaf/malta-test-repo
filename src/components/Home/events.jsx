import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { realTimeEvents } from "@/data/link";
import { useEvents } from "@/features/getEvents";

const Events = () => {
  const { data: events, isLoading, isError, error } = useEvents();

  if (isLoading)
    return <div className="text-center py-8">Loading events...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">{error.message}</div>
    );
  if (!events || events.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">No events found.</div>
    );

  return (
    <div className="px-8 md:px-20 my-32 relative">
      <div className="text-center">
      <h4 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
      Read the Latest Events
      </h4>
        <br />
        <p className="text-xl md:text-2xl text-muted-foreground">
          Stay up to date with all the daily events, festivals, and activities
          happening across the island.
        </p>
      </div>
      <div className="flex flex-col items-center gap-16 mt-16">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.slice(0, 3)?.map((item, index) => (
            <Link
              key={item.id}
              href={`/events/${item.id}`}
              className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
            >
              <div className="h-48 w-full relative">
                <img
                  src={item.image || "/placeholder-event.jpg"}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-primary group-hover:underline">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {item.date} &middot; {item.location}
                </p>
                <span className="inline-block mt-3 text-pink-600 font-medium text-sm group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild size="lg" className="w-fit">
          <Link href={realTimeEvents}>See All Blogs</Link>
        </Button>
      </div>
    </div>
  );
};

export default Events;

const EventDescription = ({ event }) => {
  const paragraphs = event.description.split("\n\n");
  return (
    <div>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
};
