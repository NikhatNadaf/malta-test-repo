"use client";

import React, { useState, useRef, useEffect } from "react";
import { format, addDays } from "date-fns"; // update import
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const priceMap = {
    "2025-06-01": 520,
    "2025-06-02": 500,
    "2025-06-03": 600,
    "2025-06-04": 450,
    "2025-06-05": 700,
    "2025-06-06": 550,
    "2025-06-07": 610,
    "2025-06-08": 490,
    "2025-06-09": 630,
    "2025-06-10": 580,
};

function getDateKey(date) {
    return format(date, "yyyy-MM-dd");
}

export default function TravelDateInput() {
    // Set default selectedDate to tomorrow
    const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
    const [showCalendar, setShowCalendar] = useState(false);
    const [numberOfMonths, setNumberOfMonths] = useState(2); // NEW
    const calendarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Responsive months
    useEffect(() => {
        function handleResize() {
            setNumberOfMonths(window.innerWidth < 640 ? 1 : 2);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Use "PPPP" for full date format
    const formattedDate = selectedDate ? format(selectedDate, "PPPP") : "";
    const selectedPrice = selectedDate ? priceMap[getDateKey(selectedDate)] : null;

    return (
        <div className="relative max-full">
            <label htmlFor="travel-date" className="text-sm font-medium mb-1 block">
                Travel Date
            </label>
            <div className="relative">
                {/* Calendar Icon */}
                <button
                    type="button"
                    tabIndex={-1}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCalendar(true)}
                    aria-label="Open calendar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                <input
                    id="travel-date"
                    type="text"
                    readOnly
                    value={
                        selectedDate
                            ? `${formattedDate}`
                            : ""
                    }
                    onFocus={() => setShowCalendar(true)}
                    className="w-full rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm px-4 py-3 transition-colors ps-10"
                    placeholder="Select a date"
                />
            </div>
            {showCalendar && (
                <div
                    ref={calendarRef}
                    className="absolute z-10 mt-2 shadow-lg border bg-white right-0"
                >
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date);
                            setShowCalendar(false);
                        }}
                        showOutsideDays
                        numberOfMonths={numberOfMonths}
                        modifiers={{
                            hasPrice: (date) => !!priceMap[getDateKey(date)],
                        }}
                        modifiersClassNames={{
                            hasPrice: "has-price",
                        }}
                        components={{
                            DayContent: (props) => {
                                const { date } = props;
                                const dayNumber = format(date, "d");
                                const price = priceMap[getDateKey(date)];
                                const isSelected = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
                                return (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <span className={`font-medium ${isSelected ? "text-white" : ""}`}>{dayNumber}</span>
                                        {price !== undefined && (
                                            <span className={`text-red-600 font-normal text-[10px] ${isSelected ? "text-white" : ""}`}>
                                                ${price}
                                            </span>
                                        )}
                                    </div>
                                );
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}
