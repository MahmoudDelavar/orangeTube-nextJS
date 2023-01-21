import axios from "axios";
import { fetchUrl } from "../next.config";
//==================================================
//-----------------save the comment-----------------
export async function saveComment(commentInfo) {
  const url = `${fetchUrl}/api/comment/saveComment`;
  const response = await axios.post(url, commentInfo);
  const newComment = response.data.data;
  return newComment;
}

//-----------------Load Comments-----------------
export async function getComments(videoId) {
  const url = `${fetchUrl}/api/comment/getComments`;
  const response = await axios.post(url, { videoId });
  const loadedComments = response.data.data;
  return loadedComments;
}
