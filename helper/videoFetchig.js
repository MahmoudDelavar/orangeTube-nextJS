import axios from "axios";
import { dev_phase } from "../next.config";
//===================================
//---------fetch video by Id---------
export async function getVideoById(id) {
  const url = `${dev_phase.fechUrl}/api/video/getById`;
  const response = await axios.post(url, id);
  const video = response.data.data;
  return video;
}

//---------fetch All videos---------
export async function getAllVideos() {
  let url = `${dev_phase.fechUrl}/api/video/getAllVideos`;
  const response = await axios.post(url);
  const videos = response.data.data;
  return videos;
}
