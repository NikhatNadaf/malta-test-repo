const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: "https://api.maltaxplore.com",
});
export const fetchClientSecret = async (data) =>
  instance.post("/create-payment-url", data);

// data:
//   {
//     "amount": 30600,
//     "currency": "eur",
//     "email": "yash.nachaald@gmail.com",
//     "account_id": "123",
//     "transfer_amount": 24000
// }
