import express from "express"
import { postComment, getAllComments, editComment, deleteComment } from "../Controllers/Comments.js";
import auth from "../Middleware/Auth.js";

const router = express.Router();
router.post("/post", auth, postComment);
router.get("/get", getAllComments);
router.delete("/delete/:id", auth, deleteComment);
router.patch("/edit/:id", auth, editComment);

export default router;