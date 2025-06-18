import { Component1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { categories } from "@/data/data";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { search } from "@/data/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useServiceTypeState } from "@/context/servicesContext";

export const Categories = ({ className }) => {
  const router = useRouter();
  const { query } = router;
  const { serviceType } = useServiceTypeState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [guest, setGuest] = useState();
  const [disabled, setDisabled] = useState(false);

  const buildQuery = () => {
    const query = {};
    if (category) query.category = category;
    if (guest) query.guest = guest;
    if (date) query.date = String(date);
    return query;
  };

  useEffect(() => {
    if (query.category) {
      setCategory(query.category);
    }
  }, [query.category]);

  const handleGuest = (e) => {
    const value = e.target.value.trim();
    const numberValue = Number(value);

    if (value === "" || (numberValue >= 1 && Number.isInteger(numberValue))) {
      setGuest(value);
      setDisabled(false);
    } else {
      setGuest(value);
      setDisabled(true);
    }
  };

  const handleCategorySelect = (value) => {
    if (value === "all") {
      setCategory("all");
    } else {
      setCategory(value);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-4 relative z-10 md:gap-2 p-2 md:p-4 border bg-white mx-auto w-fit shadow-lg rounded-xl max-md:space-y-1 items-end",
        className
      )}
    >
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
          <Component1Icon />
          Categories
        </p>
        <Select value={category} onValueChange={handleCategorySelect}>
          <SelectTrigger className="w-full h-10">
            <SelectValue
              placeholder="Select Category"
              value={category === "all" ? "All Categories" : category} // Show "All Categories" if "all" is selected
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* "All" Option */}
              <SelectItem key="all" value="all">
                All Categories
              </SelectItem>
              {/* Dynamic Categories */}
              {serviceType?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
          <Component1Icon />
          Date
        </p>
        <DatePicker
          date={date}
          onChange={setDate}
          className="w-full  h-10"
          placeholder={"Select date"}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground p-1 flex items-center gap-1 text-primary-foreground0 py-2">
          <Component1Icon />
          Add Guest
        </p>
        <Input
          value={guest}
          onChange={handleGuest}
          placeholder="Enter number of guests..."
          type="number"
          min="1"
          className="w-full h-10"
        />
      </div>
      <Button
        asChild
        className={cn(
          "flex items-center gap-2 text-xl transition-opacity",
          disabled ? "opacity-50 cursor-not-allowed" : ""
        )}
        disabled={disabled}
      >
        <Link
          href={{
            pathname: search,
            query: buildQuery(),
          }}
          onClick={(e) => disabled && e.preventDefault()}
        >
          <MagnifyingGlassIcon /> Search
        </Link>
      </Button>
    </div>
  );
};
