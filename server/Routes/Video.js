import express from "express"
import { likeVideoController } from "../Controllers/Like.js";
import { viewsController } from "../Controllers/Views.js";
import { uploadVideo, getAllVideos } from "../Controllers/Video.js";
import auth from "../Middleware/Auth.js";
import upload from "../Helper/FileHelper.js";
import { historyController, deleteHistory, getAllHistoryController } from "../Controllers/History.js";

const routes = express.Router();

routes.post("/upload_video", auth, upload.single("file"), uploadVideo);
routes.get("/get_videos", getAllVideos);
routes.patch("/like/:id", auth, likeVideoController);
routes.patch("/views/:id", viewsController);

routes.post("/history", historyController);
routes.get("/get_all_history", getAllHistoryController);
routes.delete("/delete_history/:user_id", deleteHistory);

export default routes;