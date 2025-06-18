import mongoose from "mongoose";

const likeVideoSchema = mongoose.Schema({
      video_id: {
            type: String,
            required: true
      },
      viewer: {
            type: String,
            required: true
      },
      liked_on: {
            type: Date,
            default: Date.now()
      }
});

export default mongoose.model("LikedVideos", likeVideoSchema);