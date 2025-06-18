import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "./button";
import { home } from "@/data/link";
import { useAuthState } from "@/context/ueAuthContext";
import { useRouter } from "next/router";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServiceTypeState } from "@/context/servicesContext";

function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthState();
  const { serviceType } = useServiceTypeState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState();
  const [date, setDate] = useState();

  const handleCategorySelect = (value) => {
    setCategory(value);
  };

  return (
    <div className="sticky top-0 bg-white z-50 w-full shadow-sm py-4">
      <nav className="flex flex-wrap items-center justify-between lg:mx-20 mx-4 gap-4">
        {/* Logo */}
        <Link href={home}>
          <Image
            src="/images/logo.svg"
            height={60}
            width={150}
            alt="Logo"
            priority
          />
        </Link>

        {/* Search Bar - Left side on desktop */}
        <div className="hidden lg:flex items-center gap-4 flex-wrap">
          <Select value={category} onValueChange={handleCategorySelect}>
            <SelectTrigger className="h-10 rounded-md bg-white text-black w-40 border">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {serviceType?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DatePicker
            date={date}
            onChange={setDate}
            className="h-10 rounded-md w-36"
            placeholder="Pick a Date"
          />

          <Button
            className="h-10 px-4"
            onClick={() => {
              const query = {};
              if (category) query.category = category;
              if (date) query.date = String(date);
              router.push({ pathname: "/search", query });
            }}
          >
            Search
          </Button>
        </div>

        {/* Right Side: Reels + Auth */}
        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/Itinerary"
            className="relative text-sm font-medium text-black hover:underline px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Trip Builder
            <span className="absolute -top-1 -right-3 text-[10px] bg-red-500 text-white px-1 py-0.5 rounded-full">
              NEW
            </span>
          </Link>

          {user ? (
            <Button size="sm" asChild className="w-full lg:w-auto">
              <Link href="/user/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button
              size="sm"
              asChild
              className="w-full lg:w-auto"
              onClick={() => router.push("/user/dashboard")}
            >
              <Link href="/user/dashboard?auth=login">
                {t("navbar.login")}
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Search/Actions - hidden on desktop */}
        {isMobileMenuOpen && (
          <div className="flex flex-col w-full gap-4 lg:hidden mt-4">
            <Select value={category} onValueChange={handleCategorySelect}>
              <SelectTrigger className="h-10 rounded-md bg-white text-black w-full border">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {serviceType?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <DatePicker
              date={date}
              onChange={setDate}
              className="h-10 rounded-md w-full"
              placeholder="Pick a Date"
            />

            <Button
              className="h-10 w-full"
              onClick={() => {
                const query = {};
                if (category) query.category = category;
                if (date) query.date = String(date);
                router.push({ pathname: "/search", query });
              }}
            >
              Search
            </Button>
          </div>
        )}

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
