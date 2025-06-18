import LikedVideos from "../Models/LikedVideos.js";

export const likedVideosController = async (req, res) => {
      const likedVideoData = req.body;
      const addToLikedVideo = new LikedVideos(likedVideoData);
      try {
            await addToLikedVideo.save();
            res.status(200).json("Added to liked videos...");
      } catch (error) {
            res.status(400).json(error.message);
            return;
      }
}

export const getAllLikedVideos = async (req, res) => {
      try {
            const files = await LikedVideos.find();
            res.status(200).send(files);
      } catch (error) {
            res.status(400).json(error.message);
            return;
      }
}

export const deleteLikedVideo = async (req, res) => {
      const { video_id: video_id, viewer: viewer } = req.params;
      try {
            await LikedVideos.findOneAndDelete({
                  video_id: video_id,
                  viewer: viewer
            });
            res.status(200).json({ message: "Removed from liked videos..." });
      } catch (error) {
            res.status(400).json(error.message);
            return;
      }
}