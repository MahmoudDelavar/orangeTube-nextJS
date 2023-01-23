import axios from "axios";
import { fetchUrl } from "../next.config";
//=========================================================================
//                          Likes functions
//=========================================================================
//-----------------get number of likes-----------------
export async function getLikes(info) {
  const url = `${fetchUrl}/api/likeAndDislike/getLikes`;
  const response = await axios.post(url, info);
  const likes = response.data.data;
  return likes;
}
//-----------------upLike-----------------
export async function upLike(info) {
  const url = `${fetchUrl}/api/likeAndDislike/upLike`;
  const response = await axios.post(url, info);
  return response;
}
//-----------------UnLike-----------------
export async function unLike(info) {
  const url = `${fetchUrl}/api/likeAndDislike/unLike`;
  const response = await axios.post(url, info);
  return response;
}

//=========================================================================
//                       Dislikes functions
//=========================================================================
//-----------------get number of DisLikes-----------------
export async function getDisLikes(info) {
  const url = `${fetchUrl}/api/likeAndDislike/getDisLikes`;
  const response = await axios.post(url, info);
  const dislikes = response.data.data;
  return dislikes;
}

//-----------------upDisLike-----------------
export async function upDisLike(info) {
  const url = `${fetchUrl}/api/likeAndDislike/upDisLike`;
  const response = await axios.post(url, info);
  return response;
}
//-----------------UnDisLike-----------------
export async function unDisLike(info) {
  const url = `${fetchUrl}/api/likeAndDislike/unDisLike`;
  const response = await axios.post(url, info);
  return response;
}
