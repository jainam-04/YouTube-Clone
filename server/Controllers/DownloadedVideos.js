import DownloadedVideos from "../Models/DownloadedVideos.js";
import Users from "../Models/Auth.js"

export const downloadedVideosController = async (req, res) => {
      const { video_id, viewer } = req.body;
      if (!video_id || !viewer) {
            return res.status(400).json({ message: "Missing required fields..." });
      }
      try {
            const user = await Users.findById(viewer);
            if (!user) {
                  return res.status(404).json({ message: "User not found..." });
            }
            const now = new Date();
            if (user.premium_plan !== "free" && user.premium_plan_expiry_date && now > new Date(user.premium_plan_expiry_date)) {
                  user.premium_plan = "free";
                  user.premium_plan_start_date = null;
                  user.premium_plan_expiry_date = null;
                  await user.save();
            }
            if (user.premium_plan === "free") {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const alreadyDownloaded = await DownloadedVideos.findOne({
                        viewer,
                        downloaded_at: { $gte: today }
                  });
                  if (alreadyDownloaded) {
                        return res.status(403).json({ message: "Download limit reached for today. Upgrade to premium for unlimited downloads..." });
                  }
            }
            const addToDownloadedVideos = new DownloadedVideos({ video_id, viewer });
            await addToDownloadedVideos.save();
            res.status(200).json(addToDownloadedVideos);
      } catch (error) {
            res.status(500).json({ message: "Error saving downloaded video...", error });
            return;
      }
}

export const getDownloadedVideos = async (req, res) => {
      const { viewer } = req.params;
      if (!viewer) {
            return res.satus(404).json({ message: "User not found..." });
      }
      try {
            const downloads = await DownloadedVideos.find({ viewer });
            res.status(200).json(downloads);
      } catch (error) {
            res.status(500).json({ message: "Error fetching downloaded videos...", error });
            return;
      }
}

export const deleteDownloadedVideos = async (req, res) => {
      const { video_id, viewer } = req.params;
      if (!video_id || !viewer) {
            return res.status(400).json({ message: "Missing required fields..." });
      }
      try {
            const deleted = await DownloadedVideos.findOneAndDelete({ video_id, viewer });
            if (!deleted) {
                  return res.status(404).json({ message: "Downloaded video not found..." });
            }
            res.status(200).json({ message: "Deleted downloaded video...", deleted });
      } catch (error) {
            res.status(500).json({ message: "Error deleting downloaded video...", error });
            return;
      }
}