import React, { useEffect, useState } from "react";
import UserWrapper from "./_app";
import { getPastUpcomingBookings } from "@/features/dashboard/getPastUpcomingBookings.js";
import { useAuthState } from "@/context/ueAuthContext";
import { getServices } from "@/features/getServices";
import { getUserLikes } from "@/features/getUserLikes";
import BookingCardComponentNew from "@/components/cui/booking-card-new";
import { Calendar, Search, Filter, ArrowUpDown, MapPin, Clock, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const UpcomingBooking = () => {
  const { user } = useAuthState();
  const [likes, setLikes] = useState();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings only when user changes
  useEffect(() => {
    const fetchedBookings = async () => {
      setIsLoading(true);
      try {
        if (user?.id) {
          const upcomingServices = await getPastUpcomingBookings(user.id);
          setUpcomingBookings(upcomingServices.upcomingBookings || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchedBookings();
  }, [user?.id]); // Only depend on user.id

  // Fetch likes separately
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (user?.id) {
          const likesData = await getUserLikes(user.id);
          setLikes(likesData);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [user?.id]); // Only depend on user.id

  const filterBookings = (bookings) => {
    if (!bookings) return [];
    
    let filtered = bookings.filter(item => item?.services !== null);

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item?.services?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.services?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const now = new Date();
    switch (filterBy) {
      case 'thisWeek':
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(item => {
          const bookingDate = new Date(item?.servicebookings?.start_date);
          return bookingDate <= weekFromNow;
        });
        break;
      case 'thisMonth':
        const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(item => {
          const bookingDate = new Date(item?.servicebookings?.start_date);
          return bookingDate <= monthFromNow;
        });
        break;
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a?.servicebookings?.start_date) - new Date(b?.servicebookings?.start_date);
        case 'name':
          return a?.services?.name.localeCompare(b?.services?.name);
        case 'location':
          return a?.services?.location.localeCompare(b?.services?.location);
        default:
          return 0;
      }
    });
  };

  const filteredBookings = filterBookings(upcomingBookings);

  const renderBookingCard = (booking) => {
    const startDate = new Date(booking?.servicebookings?.start_date);
    const formattedDate = format(startDate, 'MMM dd, yyyy');
    const formattedTime = format(startDate, 'hh:mm a');
    
    // Get the first image from the images array or a default image
    const imageUrl = booking?.services?.images?.[0] || 
                    booking?.services?.image?.[0] || 
                    booking?.services?.image || 
                    '/images/placeholder.jpg';

    return (
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200 bg-white">
        <div className="flex flex-col h-full">
          <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={booking?.services?.name}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
              {formattedDate}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {booking?.services?.name}
          </h3>
          
          <div className="space-y-2 flex-grow">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{booking?.services?.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{formattedTime}</span>
            </div>
            {booking?.servicebookings?.notes && (
              <div className="flex items-start text-gray-600">
                <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm line-clamp-2">{booking?.servicebookings?.notes}</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <div className="text-sm font-medium">
              {booking?.servicebookings?.number_of_people} People
            </div>
            <Button variant="outline" className="hover:bg-primary hover:text-white">
              View Details
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <UserWrapper>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Upcoming Bookings</h1>
          <p className="text-muted-foreground">
            Manage and view your upcoming travel experiences
          </p>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="location">Sort by Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking, index) => (
              <div key={index}>
                {renderBookingCard(booking)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Bookings</h3>
            <p className="text-gray-500">
              {searchTerm ? "No bookings match your search criteria." : "You don't have any upcoming bookings yet."}
            </p>
          </div>
        )}
      </div>
    </UserWrapper>
  );
};

export default UpcomingBooking;
