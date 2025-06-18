import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Clock10, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { formatTime } from "@/utils/date";

function EventCard({
  title,
  description,
  start_time,
  end_time,
  date,
  url,
  location,
  redirect_url,
  more_info_url,
}) {
  return (
    <Card className="border p-4 bg-zinc-50">
      <Image
        width={500}
        height={500}
        className="w-full rounded-lg h-64 object-cover"
        src={url}
      />
      <div className="flex flex-col my-4 gap-2">
        <div className="flex font-semibold text-sm justify-between">
          <p className="flex gap-1 text-muted-foreground items-center">
            <MapPin className="text-primary h-4 w-4" /> {location}
          </p>
          <p className="text-xs flex gap-1 text-muted-foreground items-center">
            <Clock10 className="text-primary h-4 w-4" />{" "}
            {formatTime(start_time)} - {formatTime(end_time)}{" "}
          </p>
        </div>
        <p className="text-primary font-semibold">{date}</p>
        <p className="text-xl mt-2 font-bold">{title}</p>
        <p
          className="text-muted-foreground line-clamp-1 hover:line-clamp-none overflow-hidden hover:overflow-visible"
        >
          {description}
        </p>        <br />
        <div className="grid grid-cols-2 items-center gap-4">
          <a href={redirect_url} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full">Book Ticket</Button>
          </a>
          <a href={more_info_url} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full" variant="outline">
              More Info
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}

export default EventCard;
