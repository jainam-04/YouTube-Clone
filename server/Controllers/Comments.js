import Comments from "../Models/Comments.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
      const commentData = req.body;
      const postComment = new Comments(commentData);
      try {
            await postComment.save();
            res.status(200).json("Comment Posted Successfully!!")
      } catch (error) {
            res.status(400).json(error);
            return;
      }
}

export const getAllComments = async (req, res) => {
      try {
            const commentList = await Comments.find();
            res.status(200).send(commentList);
      } catch (error) {
            res.status(400).json(error);
            return;
      }
}

export const deleteComment = async (req, res) => {
      const { id: _id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send("Comments unavailable!!")
      }
      try {
            await Comments.findByIdAndDelete(_id);
            res.status(200).json({ message: "Comment Deleted Successfully!!!" })
      } catch (error) {
            res.status(400).json(error);
            return;
      }
}

export const editComment = async (req, res) => {
      const { id: _id } = req.params;
      const { commentBody } = req.body;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send("Comments unavailable!!!");
      }
      try {
            const updateComment = await Comments.findByIdAndUpdate(
                  _id, {
                  $set: {
                        "comment_body": commentBody,
                  }
            }
            )
            res.status(200).json(updateComment);
      } catch (error) {
            res.status(400).json(error);
            return;
      }
}