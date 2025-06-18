import * as api from "../API";

export const addToLikedVideo = (likedVideoData) => async (dispatch) => {
      try {
            const { data } = await api.addToLikedVideo(likedVideoData);
            dispatch({ type: "POST_LIKED_VIDEO", data });
            dispatch(getAllLikedVideo());
      } catch (error) {
            console.log(error);
      }
}

export const getAllLikedVideo = () => async (dispatch) => {
      try {
            const { data } = await api.getAllLikedVideo();
            dispatch({ type: "FETCH_ALL_LIKED_VIDEOS", payload: data });
      } catch (error) {
            console.log(error);
      }
}

export const deleteLikedVideo = (likedVideoData) => async (dispatch) => {
      try {
            const { video_id, viewer } = likedVideoData;
            await api.deleteLikedVideo(video_id, viewer);
            dispatch(getAllLikedVideo());
      } catch (error) {
            console.log(error);
      }
}