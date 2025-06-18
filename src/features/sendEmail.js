import axios from "axios";

export const sendEmail = async (paymentDetails, templateDetails) => {
  const bookingLink = `${window.location.origin}/booking-details?booking_id=${templateDetails?.booking_id}`;

  try {
    const date = new Date(paymentDetails.created * 1000).toLocaleString();
    const price = (paymentDetails.amount / 100).toFixed(2);
    const templateParams = {
      user_name: templateDetails.guest_name,
      booking_date: date,
      payment_amount: price,
      user_email: paymentDetails?.receipt_email,
      payment_method: paymentDetails?.payment_method_types[0],
      payment_intent: paymentDetails?.id,
      booking_link: bookingLink,
    };

    const response = await axios.post(
      "https://api.maltaxplore.com/send_email",
      {
        id: "booking-email-template",
        to: templateParams?.user_email,
        values: templateParams,
        header: "Booking confirmed",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": 1234,
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendEmailToBookingPersons = async (
  templateDetails,
  emailTemplate,
  bookingData
) => {
  const bookingLink = `${window.location.origin}/booking-details?booking_id=${templateDetails?.booking_id}`;
  try {
    const templateParams = {
      user_email: emailTemplate.email,
      guest_name: emailTemplate.guest_name, 
      booking_id: templateDetails?.booking_id,
      service_name: templateDetails?.service_name,
      booking_start_date: bookingData[0]?.booking_id?.start_date,
      booking_end_date: bookingData[0]?.booking_id?.end_date,
      service_location: templateDetails?.service_location,
      pickup_location: templateDetails?.pickup_location,
      pickup_date: templateDetails?.pickup_date,
      pickup_time: templateDetails?.pickup_time,
      booker_name: templateDetails?.booker_name,
      total_tickets_booked: templateDetails?.total_tickets_booked,
      company_name: "MaltaXplore",
      booking_link: bookingLink,
    };
    console.log(templateParams)
    const response = await axios.post(
      "https://api.maltaxplore.com/send_email",
      {
        id: "confirmation-email-template",
        to: emailTemplate?.email,
        values: templateParams,
        header: "Booking confirmed!",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": 1234,
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendCancellationEmail = async (templateDetails) => {
  const bookingLink = `${window.location.origin}/booking-details?booking_id=${templateDetails?.booking_id}`;
  try {
    const templateParams = {
      guest_name: templateDetails?.guest_name,
      service_name: templateDetails?.service_name,
      booking_id: templateDetails?.booking_id,
      refund_amount: templateDetails?.refund_amount,
      booking_link: bookingLink,
      company_name: "MaltaXplore",
    };
    console.log("templateParams", templateParams);
    const response = await axios.post(
      "https://api.maltaxplore.com/send_email",
      {
        id: "booking-cancelled-email",
        to: templateDetails?.user_email,
        values: templateParams,
        header: "Your booking has been cancelled!",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": 1234,
        },
      }
    );
    console.log("sendCancellationEmail", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
