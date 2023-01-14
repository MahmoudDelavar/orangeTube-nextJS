import axios from "axios";
import { fetchUrl } from "../next.config";
//===================================
//---------Login user---------
export async function loginUser(userInfo) {
  const url = `${fetchUrl}/api/auth/login`;
  const response = await axios.post(url, userInfo);
  return response;
}

//---------Register user---------
export async function registerUser(userInfo) {
  let url = `${fetchUrl}/api/auth/register`;
  const response = await axios.post(url, userInfo);
  return response;
}
//---------user is loggined or not---------
export async function isLoggined(token) {
  let url = `${fetchUrl}/api/auth/me`;
  const response = await axios.post(url, { token });
  return response;
}
