import { format } from "date-fns";

export const formatDate = (date) => {
  try {
    return format(new Date(Number(date)), "PPP");
  } catch (e) {
    return "";
  }
};

export const formatTime = (time) => {
  try {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return "";
  }
};

export const formatDateToDDMMYYYY = (date) => {
  try {
    return format(date, "PPP");
  } catch (e) {
    console.error(e)
    return "";
  }
};