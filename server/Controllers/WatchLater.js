import WatchLater from "../Models/WatchLater.js";

export const watchLaterController = async (req, res) => {
      const watchLaterVideosData = req.body;
      const addToWatchLater = new WatchLater(watchLaterVideosData);
      try {
            await addToWatchLater.save();
            res.status(200).json("Added to watch later...");
      } catch (error) {
            res.status(400).json(error.message);
            return;
      }
}

export const getAllWatchLaterController = async (req, res) => {
      try {
            const files = await WatchLater.find();
            res.status(200).send(files);
      } catch (error) {
            res.status(400).json(error.message);
            return;
      }
}

export const deleteWatchLater = async (req, res) => {
      const { video_id: video_id, viewer: viewer } = req.params;
      try {
            await WatchLater.findOneAndDelete({
                  video_id: video_id,
                  viewer: viewer
            });
            res.status(200).json({ message: "Removed from watch later..." });
      } catch (error) {
            res.status(400).json(error.message);
            return;
      }
}