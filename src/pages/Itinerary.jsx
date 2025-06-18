"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseConfig";
import ProductImages from "@/components/ProductImages/ProductImages";
import { Clock, X, ShoppingCart } from "lucide-react";

export default function ItineraryBuilder() {
  const [tripStarted, setTripStarted] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [budget, setBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [pickupLocation, setPickupLocation] = useState("");
  const [itinerary, setItinerary] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [popupMessage, setPopupMessage] = useState("");
  const [timePicker, setTimePicker] = useState({ open: false, service: null, day: null });

  useEffect(() => {
    const fetchData = async () => {
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("status", "active");

      const { data: serviceTypes } = await supabase.from("servicetype").select("*");

      const updatedServices = await Promise.all(
        servicesData.map(async (s) => {
          let price = s.price;
          if (!price) {
            const { data: groupPriceData } = await supabase
              .from("pricebygroupsize")
              .select("price")
              .eq("service_id", s.id)
              .order("price", { ascending: true })
              .limit(1)
              .single();
            price = groupPriceData?.price ?? 50;
          }

          return {
            ...s,
            price,
            category: serviceTypes.find((t) => t.id === s.service_type)?.name || "Other",
          };
        })
      );

      setServices(updatedServices);
      const categoryList = ["All", ...new Set(serviceTypes.map((t) => t.name))];
      setCategories(categoryList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalSpent = itinerary.reduce((sum, item) => sum + item.price, 0);
    setRemainingBudget(budget - totalSpent);
  }, [itinerary, budget]);

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleStart = () => {
    if (totalDays > 0 && budget > 0) {
      setTripStarted(true);
    } else {
      triggerPopup("Please enter valid trip duration and budget.");
    }
  };

  const handleOpenTimePicker = (service, day) => {
    setTimePicker({ open: true, service, day });
  };

  const handleConfirmTime = (time) => {
    const { service, day } = timePicker;
    if (remainingBudget - service.price < 0) {
      triggerPopup("You don't have enough budget for this activity.");
    } else {
      setItinerary([
        ...itinerary,
        { ...service, day, time, location: pickupLocation }
      ]);
      setTimePicker({ open: false, service: null, day: null });
    }
  };

  const removeFromItinerary = (id, day) => {
    setItinerary(itinerary.filter((item) => !(item.id === id && item.day === day)));
  };

  const filteredServices =
    activeCategory === "All" ? services : services.filter((s) => s.category === activeCategory);

  const totalPrice = itinerary.reduce((sum, item) => sum + item.price, 0);

  const timeOptions = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const getMainImage = (service) => {
    try {
      const raw = service?.images?.[0];
      const parsed = JSON.parse(raw);
      return parsed?.url?.startsWith("@") ? parsed.url.slice(1) : parsed.url;
    } catch {
      return `https://picsum.photos/500/400?random=${service?.id || Math.random()}`;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {popupMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-lg flex items-center gap-3 z-50">
          <span className="text-3xl">😢</span>
          <span className="font-medium text-gray-700">{popupMessage}</span>
        </div>
      )}

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">MaltaXplore Itinerary Builder</h1>
        <p className="text-lg text-gray-600">Build your personalized Malta trip</p>
      </header>

      {!tripStarted ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Trip Duration (Days)</label>
            <input type="number" min={1} className="w-full border p-3 rounded text-center"
              value={totalDays === 0 ? "" : totalDays}
              onChange={(e) => setTotalDays(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Budget (€)</label>
            <input type="number" min={1} className="w-full border p-3 rounded text-center"
              value={budget === 0 ? "" : budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Pickup Location</label>
            <input type="text" placeholder="Optional pickup location" className="w-full border p-3 rounded text-center"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>
          <button onClick={handleStart}
            className="w-full bg-red-600 text-white py-3 rounded-lg text-lg hover:bg-red-700 transition">
            Start Planning
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <div className="text-xl font-semibold mb-2">
              Remaining Budget: €{remainingBudget} / €{budget}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button key={cat}
                className={`px-6 py-2 rounded-full text-sm font-medium ${activeCategory === cat ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"} transition`}
                onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredServices.map((service) => {
              const isAffordable = remainingBudget >= service.price;
              return (
                <div key={service.id}
                  className="relative group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative w-full h-[220px] flex items-center justify-center bg-gray-100">
                    <img src={getMainImage(service)} alt={service.name} className="object-cover h-full w-full" />
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                      <p className="text-sm text-gray-500 mb-3">{service.description}</p>

                      <div className="font-semibold text-lg mb-2">
                        €{service.price}{" "}
                        <span className={`ml-3 font-semibold ${isAffordable ? "text-green-600" : "text-red-600"}`}>
                          {isAffordable ? "In Budget" : "Exceeds Budget"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[...Array(totalDays)].map((_, index) => (
                        <button key={index}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                          onClick={() => handleOpenTimePicker(service, index + 1)}>
                          Add to Day {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Your Itinerary</h2>

            {[...Array(totalDays)].map((_, dayIndex) => {
              const day = dayIndex + 1;
              const dayActivities = itinerary.filter((item) => item.day === day);

              return (
                <div key={day} className="mb-10">
                  <h3 className="text-xl font-medium mb-3">Day {day}</h3>

                  {dayActivities.length === 0 ? (
                    <p className="text-gray-500">No activities added yet for this day.</p>
                  ) : (
                    <div className="space-y-4">
                      {dayActivities.map((item) => (
                        <div key={`${item.id}-${item.day}`}
                          className="bg-white flex justify-between items-center p-4 rounded-lg shadow">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              {item.time} | €{item.price} | Pickup: {item.location}
                            </p>
                          </div>
                          <button className="p-2 bg-red-500 text-white rounded-full"
                            onClick={() => removeFromItinerary(item.id, item.day)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-between items-center mt-8 p-4 border-t">
              <div className="flex items-center text-xl font-semibold gap-2">
                Total: €{totalPrice}
                <ShoppingCart className="w-6 h-6 text-red-600" />
              </div>
              <button className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition">
                Checkout & Confirm
              </button>
            </div>
          </section>
        </>
      )}

      {timePicker.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[350px] relative">
            <button onClick={() => setTimePicker({ open: false, service: null, day: null })} className="absolute top-3 right-3">
              <X className="w-5 h-5 text-gray-500 hover:text-black" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Select Start Time</h3>

            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map((t) => (
                <button key={t}
                  className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                  onClick={() => handleConfirmTime(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
