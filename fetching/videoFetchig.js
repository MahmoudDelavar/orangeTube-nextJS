import axios from "axios";
import { fetchUrl } from "../next.config";
//===================================
//---------fetch video by Id---------
export async function getVideoById(id) {
  const url = `${fetchUrl}/api/video/getById`;
  const response = await axios.post(url, id);
  const video = response.data.data;
  return video;
}

//---------fetch All videos---------
export async function getAllVideos() {
  let url = `${fetchUrl}/api/video/getAllVideos`;
  const response = await axios.post(url);
  const videos = response.data.data;
  return videos;
}
//---------fetch All Subscribtion Videos---------
export async function getSubscribtionVideos(userId) {
  let url = `${fetchUrl}/api/video/getSubscribtionVideos`;
  const response = await axios.post(url, { userFrom: userId });
  const videos = response.data.data;
  return videos;
}
