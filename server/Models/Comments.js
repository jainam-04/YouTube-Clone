import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
      video_id: String,
      user_id: String,
      comment_body: String,
      user_commented: String,
      commented_on: {
            type: Date,
            default: Date.now
      }
});

export default mongoose.model("Comments", commentSchema);