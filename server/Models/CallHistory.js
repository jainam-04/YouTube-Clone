import mongoose from "mongoose";

const callHistorySchema = new mongoose.Schema({
      sender: {
            type: String,
            required: true
      },
      receiver: {
            type: String,
            required: true
      },
      room_id: {
            type: String,
            required: true
      },
      was_connected: {
            type: Boolean,
            default: false
      },
      start_time: {
            type: Date,
            default: Date.now,
            required: true
      },
      end_time: {
            type: Date
      },
      duration_in_seconds: {
            type: Number
      },
      screen_shared: {
            type: Boolean,
            default: false
      },
      was_recorded: {
            type: Boolean,
            default: false
      },
      recording_url: {
            type: String,
            default: null
      }
}, {
      timestamps: true
});

export default mongoose.model("Call History", callHistorySchema);