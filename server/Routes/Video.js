import express from "express"
import { likeVideoController } from "../Controllers/Like.js";
import { viewsController } from "../Controllers/Views.js";
import { uploadVideo, getAllVideos } from "../Controllers/Video.js";
import auth from "../Middleware/Auth.js";
import upload from "../Helper/FileHelper.js";
import { historyController, deleteHistory, getAllHistoryController } from "../Controllers/History.js";
import { getAllWatchLaterController, deleteWatchLater, watchLaterController } from "../Controllers/WatchLater.js";
import { likedVideosController, getAllLikedVideos, deleteLikedVideo } from "../Controllers/LikedVideos.js";

const routes = express.Router();

routes.post("/upload_video", auth, upload.single("file"), uploadVideo);
routes.get("/get_videos", getAllVideos);
routes.patch("/like/:id", auth, likeVideoController);
routes.patch("/views/:id", viewsController);

routes.post("/history", auth, historyController);
routes.get("/get_all_history", getAllHistoryController);
routes.delete("/delete_history/:user_id", auth, deleteHistory);

routes.post("/watch_later", auth, watchLaterController);
routes.get("/get_all_watch_later", getAllWatchLaterController);
routes.delete("/delete_watch_later/:video_id/:viewer", auth, deleteWatchLater);

routes.post("/liked_video", auth, likedVideosController);
routes.get("/get_all_liked_video", getAllLikedVideos);
routes.delete("/delete_liked_video/:video_id/:viewer", auth, deleteLikedVideo);

export default routes;