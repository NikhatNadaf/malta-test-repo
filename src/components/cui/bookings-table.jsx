import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

const BookingTableComponent = ({ data, className }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      upcoming: "bg-red-50 text-red-700",
      completed: "bg-green-50 text-green-700",
      cancelled: "bg-gray-100 text-gray-700",
    };
    return styles[status] || styles.upcoming;
  };

  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="font-semibold text-gray-700">Service</TableHead>
            <TableHead className="font-semibold text-gray-700">Date & Location</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.filter(item => item?.services !== null).map((booking, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="text-gray-900">{booking?.services?.name}</span>
                  <span className="text-sm text-gray-500">#{booking?.id?.slice(0, 8)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span>{formatDate(booking?.servicebookings?.start_date || booking?.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{booking?.services?.location}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  getStatusStyle(booking?.status || "upcoming")
                )}>
                  {booking?.status || "Upcoming"}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {(!data || data.length === 0) && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-12">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-8 w-8 text-gray-400" />
                  <p>No bookings found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTableComponent;
