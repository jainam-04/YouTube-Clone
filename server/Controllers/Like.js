import VideoFiles from "../Models/VideoFiles.js";
import mongoose from "mongoose";

export const likeVideoController = async (req, res) => {
      const { id: _id } = req.params;
      const { like } = req.body;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("Video unavailable...")
      }
      else {
            try {
                  const updateLike = await VideoFiles.findByIdAndUpdate(
                        _id, {
                        $set: {
                              "like": like
                        }
                  }
                  )
                  res.status(200).json(updateLike)
            } catch (error) {
                  res.status(400).json({ message: error.message })
            }
      }
}