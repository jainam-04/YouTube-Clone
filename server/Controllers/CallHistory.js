import CallHistory from "../Models/CallHistory.js";
import Users from "../Models/Auth.js";

export const saveCallHistory = async (req, res) => {
      try {
            const { sender,
                  receiver,
                  room_id,
                  start_time,
                  end_time,
                  screen_shared,
                  was_recorded,
                  recording_url,
                  was_connected
            } = req.body;
            const durationInSeconds = was_connected && end_time
                  ? Math.floor((end_time - start_time) / 1000)
                  : 0;
            const call = new CallHistory({
                  sender,
                  receiver,
                  room_id,
                  start_time,
                  end_time,
                  screen_shared,
                  was_recorded,
                  recording_url,
                  was_connected,
                  duration_in_seconds: durationInSeconds
            });
            await call.save();
            res.status(200).json(call);
      } catch (error) {
            console.log("Save Call History Error: ", error.message);
            res.status(500).json({ message: "Error saving call history..." });
      }
}

export const getUserIdsByEmails = async (req, res) => {
      try {
            const { callerEmail, receiverEmail } = req.body;
            const caller = await Users.findOne({ email: callerEmail });
            const receiver = await Users.findOne({ email: receiverEmail });
            if (!caller || !receiver) {
                  console.log("Caller or Receiver not found");
                  return res.status(404).json({ message: "Caller or receiver not found..." });
            }
            const receiverOnline = receiver.is_logged_in;
            if (!receiverOnline) {
                  console.log("Receiver is offline");
                  return res.status(400).json({ message: "Receiver is offline" });
            }
            res.status(200).json({
                  callerId: caller._id,
                  receiverId: receiver._id
            });
      } catch (error) {
            console.log("Error fetching user ids: ", error.message);
            res.status(500).json({ message: "Error fetching user ids..." });
      }
}