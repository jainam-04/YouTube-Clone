import VideoFiles from "../Models/VideoFiles.js";
import mongoose from "mongoose";

export const viewsController = async (req, res) => {
      const { id: _id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).send("Video unavailable...");
      }
      try {
            const files = await VideoFiles.findById(_id);
            const views = files.views;
            const updateViews = await VideoFiles.findByIdAndUpdate(
                  _id, {
                  $set: {
                        "views": views + 1
                  }
            }
            )
            res.status(200).json(updateViews);
      } catch (error) {
            res.status(400).json({ message: error.message })
      }

}