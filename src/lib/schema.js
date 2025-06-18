import { z } from "zod";

export const types = [
  { value: "tour_operator", label: "Tour Operator" },
  { value: "accommodation", label: "Accommodation Provider" },
  { value: "car_rental", label: "Car Rental & Transportation" },
  {
    value: "chauffeur",
    label: "Private Chauffeur & Airport Transfer Services",
  },
  { value: "adventure", label: "Adventure Activities & Experiences" },
  { value: "photography", label: "Photography & Videography Services" },
  { value: "conference", label: "Conference & Business Meeting Venues" },
];

export const businessActivities = {
  tour_operator: [
    { value: "guided_tours", label: "Guided Walking Tours" },
    { value: "boat_tours", label: "Boat Tours & Cruises" },
    { value: "adventure", label: "Adventure Activities" },
    { value: "historical", label: "Historical & Cultural Tours" },
    { value: "custom", label: "Custom/Private Tours" },
  ],
  accommodation: [
    { value: "hotel", label: "Hotel" },
    { value: "guesthouse", label: "Guesthouse/B&B" },
    { value: "vacation_rental", label: "Vacation Rental" },
    { value: "farmhouse", label: "Farmhouse" },
  ],
  car_rental: [
    { value: "economy", label: "Economy Cars" },
    { value: "luxury", label: "Luxury Cars" },
    { value: "convertible", label: "Convertible" },
    { value: "electric", label: "Electric Vehicles" },
    { value: "scooters", label: "Scooters/Motorbikes" },
  ],
  chauffeur: [
    { value: "airport_transfer", label: "Airport Transfers" },
    { value: "private_chauffeur", label: "Private Chauffeur" },
    { value: "vip_transport", label: "VIP/Executive Transportation" },
    { value: "custom_tours", label: "Custom Private Tours" },
    { value: "event_transport", label: "Event Transportation" },
  ],
  adventure: [
    { value: "rock_climbing", label: "Rock Climbing" },
    { value: "paragliding", label: "Paragliding" },
    { value: "ziplining", label: "Ziplining" },
    { value: "quad_biking", label: "Quad Biking" },
    { value: "jeep_safari", label: "Off-Road Jeep Safari" },
  ],
  photography: [
    { value: "vacation_photo", label: "Vacation Photography" },
    { value: "event_photo", label: "Wedding/Event Photography" },
    { value: "drone", label: "Drone Photography/Videography" },
    { value: "scenic", label: "Scenic Location Photography" },
  ],
  conference: [
    { value: "conference_halls", label: "Conference Halls" },
    { value: "meeting_rooms", label: "Meeting Rooms" },
    { value: "coworking", label: "Co-working Spaces" },
  ],
};

export const addSeller = z
  .object({
    type: z.string({
      required_error: "Please select a business type",
    }),
    businessName: z.string().min(2, {
      message: "Business name must be at least 2 characters",
    }),
    businessAddress: z.string().min(5, {
      message: "Business address must be at least 5 characters",
    }),
    activities: z.string({
      required_error: "Please select business activities",
    }),
    license: z.string().min(3, {
      message: "License number must be at least 3 characters",
    }),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    contactNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
export const signupSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const addServiceSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  category: z.number({
    required_error: "Please select a category",
  }),
  price: z.string().min(1, {
    message: "Please enter a price",
  }),
  includes: z
    .array(
      z.object({
        id: z.number(),
        text: z.string(),
        isIncluded: z.boolean(),
      })
    )
    .min(1),
  images: z.array(z.string()).optional(),
});

// Define user status types
export const UserStatus = {
  PENDING_VERIFICATION: "pending_verification",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

// Define the full user profile type
export const userProfileSchema = z.object({
  businessInfo: z.object({
    type: z.string(),
    activities: z.array(z.string()),
    name: z.string(),
    address: z.string(),
    license: z.string().optional(),
    logo: z.string().optional(),
    photos: z.array(z.string()).optional(),
  }),
  contactInfo: z.object({
    person: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
  status: z.enum([
    UserStatus.PENDING_VERIFICATION,
    UserStatus.VERIFIED,
    UserStatus.REJECTED,
  ]),
  createdAt: z.string(),
  verifiedAt: z.string().optional(),
  isEmailVerified: z.boolean(),
});

// Contact Details Schema
export const contactDetailsSchema = z.object({
  name: z.string().min(1, "First name is required"),
  // lname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  mobile_no: z.string().min(1, "Phone number is required"),
});

export const activityDetailsSchema = z.object({
  location: z.string().min(1, "Pickup location is required"),
  pickupTime: z.string().min(1, "Pickup Time is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  state: z.string().optional(),
  postalCode: z.string().min(1, "PostalCode is required"),
  addLine1: z.string().min(1, "address line 1 is required"),
  addLine2: z.string().min(1, "address line 2 is required"),
  add_note: z.string().optional(),
});

export const cardSchema = z.object({
  cardHolderName: z.string().min(1, "Cardholder name is required"),
  cardNum: z.string().min(1, "Card number must be 16 digits"),
  expirationMonth: z.string().min(1, "Expiration month is required"),
  expirationYear: z.string().min(1, "Expiration year is required"),
  cvvCode: z.string().min(1, "CVV code is required"),
  country: z.string().min(1, "country is required"),
  postalZipCode: z.string().min(1, "Postal/Zip code is required"),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required").optional(),
});

export const reviewsSchema = z.object({
  reviews: z.string().min(1, "Reviews is required"),
});

export const filtersSchema = z.object({
  range: z
    .array(z.number())
    .length(2, "Range must have exactly two values [min, max]"),

  min: z
    .number({ required_error: "Minimum price is required" })
    .min(0, "Minimum price must be greater than or equal to 0"),

  max: z
    .number({ required_error: "Maximum price is required" })
    .min(0, "Maximum price must be greater than or equal to 0"),

  location: z.string().optional(),

  serviceType: z.array(z.string()).optional(),

  serviceSubType: z.array(z.string()).optional(),

  ratings: z.array(z.number().int().min(1).max(5)).optional(),
});

export const cancelBookingSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export const bookingSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    adults: z.coerce
      .number()
      .min(1, "Adults must be greater than or equal to 1"),
    child: z.coerce
      .number()
      .min(0, "Childrens must be greater than or equal to 1"),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "startDate must be before endDate",
    path: ["startDate"],
  });

export const promoCodeSchema = z.object({
  promoCode: z.string().optional(1, "Promo Code cannot be empty"),
});
