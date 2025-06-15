import VideoFiles from "../Models/VideoFiles.js"

export const uploadVideo = async (req, res) => {
      if (req.file === undefined) {
            res.status(404).json({ message: "Please upload a mp4 video file only!" })
      }
      else {
            try {
                  const file = new VideoFiles({
                        video_title: req.body.title,
                        file_name: req.file.originalname,
                        file_path: req.file.path,
                        file_type: req.file.mimetype,
                        file_size: req.file.size,
                        video_channel: req.body.channel,
                        uploader: req.body.uploader
                  })
                  console.log(file);
                  await file.save();
                  res.status(200).send("File uploaded successfully!!");
            } catch (error) {
                  res.status(404).json({ message: error.message })
                  return
            }
      }
}

export const getAllVideos = async (req, res) => {
      try {
            const files = await VideoFiles.find();
            res.status(200).send(files);
      } catch (error) {
            res.status(404).json({ message: error.message });
            return
      }
}