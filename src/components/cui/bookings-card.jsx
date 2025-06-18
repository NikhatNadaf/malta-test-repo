import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";

const BoookingsCard = ({ count, heading }) => {
  return (
    <div>
      <Card className="max-w-md w-full mx-auto p-4 bg-white shadow-lg rounded-3xl">
        <CardHeader>
          <div className="flex gap-4 items-center">
            <div>
              <CalendarCheck className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{heading}</h2>
            </div>
          </div>
          <CardDescription className="pl-12">
            Showing <span className="text-primary">total</span> booking
          </CardDescription>
        </CardHeader>
        <CardContent className="place-self-center">
          <div className="text-7xl font-bold">{count}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoookingsCard;
