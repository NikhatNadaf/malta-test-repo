import { z } from "zod";

export const types = [
  {
    label: "Hotels",
    value: "hotels",
  },
];
export const activities = [
  {
    label: "Hotels",
    value: "hotels",
  },
];

export const addSeller = z.object({
  type: z
    .string()
    .refine((val) => types.map((item) => item.value).includes(val), {
      message: "Type must be one of: tours, hotels",
    }), // Validates that type is either 'tours' or 'hotels'
  bussinessName: z.string().min(1, { message: "Business name is required" }),
  bussinessAddress: z
    .string()
    .min(1, { message: "Business address is required" }),
  activities: z
    .string()
    .refine((val) => activities.map((item) => item.value).includes(val), {
      message: "Activities must be one of: hotels, activities",
    }), // Validates that activities are either 'hotels' or 'activities'
  license: z.string().min(1, { message: "License is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" }) // Adjust based on format
    .max(15, { message: "Contact number cannot exceed 15 digits" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});


export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Validates the format of the email
    .nonempty("Email is required"), // Ensures it's not an empty string
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .nonempty("Password is required"), // Ensures it's not empty
});
