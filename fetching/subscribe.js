import axios from "axios";
import { fetchUrl } from "../next.config";
//===================================

// ----calculate the number of subscribtions----
export async function subscribeCounter(userTo) {
  let url = `${fetchUrl}/api/subscribe/subscribeCounter`;
  const response = await axios.post(url, { userTo });
  const subscribeNumber = response.data.data;
  return subscribeNumber;
}

// ----------Check subscribed or not------------
export async function isSubscribe({ userTo, userFrom }) {
  let url = `${fetchUrl}/api/subscribe/isSubscribe`;
  const response = await axios.post(url, { userTo, userFrom });
  const isSubscribe = response.data.data;
  return isSubscribe;
}

// ------------------subscribe------------------
export async function subscribe({ userTo, userFrom }) {
  let url = `${fetchUrl}/api/subscribe/subscribe`;
  const response = await axios.post(url, { userTo, userFrom });
  const message = response.data.message;
  return message;
}

// -----------------unSubscribe-----------------
export async function unSubscribe({ userTo, userFrom }) {
  let url = `${fetchUrl}/api/subscribe/unSubscribe`;
  const response = await axios.post(url, { userTo, userFrom });
  const message = response.data.message;
  return message;
}
