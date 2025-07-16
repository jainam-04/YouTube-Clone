import mongoose from "mongoose";

const downloadedVideoSchema = new mongoose.Schema({
      video_id: {
            type: String,
            required: true
      },
      viewer: {
            type: String,
            required: true
      },
      downloaded_at: {
            type: Date,
            default: Date.now
      }
},
      {
            timestamps: true
      }
);

export default mongoose.model("DownloadedVideos", downloadedVideoSchema);