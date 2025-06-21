import axios from "axios";

// const API = axios.create({ baseURL: `http://localhost:5000` });
const API = axios.create({ baseURL: `https://youtube-clone-8mxs.onrender.com` });
API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
      }
      return req;
})

export const login = (authData) => API.post("/user/login", authData);
export const updateChannelData = (id, updateData) => API.patch(`/user/update/${id}`, updateData);
export const fetchAllChannels = () => API.get("/user/get_all_channels");

export const uploadVideo = (fileData, fileOption) => API.post("/video/upload_video", fileData, fileOption);
export const getVideos = () => API.get("/video/get_videos");
export const likeVideo = (id, like) => API.patch(`/video/like/${id}`, { like });
export const viewVideo = (id) => API.patch(`/video/views/${id}`);

export const postComment = (commentData) => API.post("/comment/post", commentData);
export const deleteComment = (id) => API.delete(`/comment/delete/${id}`);
export const editComment = (id, commentBody) => API.patch(`/comment/edit/${id}`, { commentBody });
export const getAllComments = () => API.get("/comment/get");

export const addToHistory = (historyData) => API.post("/video/history", historyData);
export const getAllHistory = () => API.get("/video/get_all_history");
export const deleteHistory = (user_id) => API.delete(`/video/delete_history/${user_id}`);

export const addToLikedVideo = (likedVideoData) => API.post("/video/liked_video", likedVideoData);
export const getAllLikedVideo = () => API.get("/video/get_all_liked_video");
export const deleteLikedVideo = (video_id, viewer) => API.delete(`/video/delete_liked_video/${video_id}/${viewer}`);

export const addToWatchLater = (watchLaterData) => API.post("/video/watch_later", watchLaterData);
export const getAllWatchLater = () => API.get("/video/get_all_watch_later");
export const deleteWatchLater = (video_id, viewer) => API.delete(`/video/delete_watch_later/${video_id}/${viewer}`);