import * as api from "../API";

export const addDownloadedVideos = ({ video_id, viewer }) => async (dispatch) => {
      try {
            const { data } = await api.addDownloadedVideos({ video_id, viewer });
            dispatch({ type: "POST_DOWNLOADED_VIDEOS", payload: data });
            dispatch(getDownloadedVideos(viewer));
      } catch (error) {
            console.log(error);
      }
}

export const getDownloadedVideos = (viewer) => async (dispatch) => {
      try {
            const { data } = await api.getAllDownloadedVideos(viewer);
            dispatch({ type: "FETCH_ALL_DOWNLOADED_VIDEOS", payload: data });
      } catch (error) {
            console.log(error);
      }
}

export const deleteDownloadedVideos = ({ video_id, viewer }) => async (dispatch) => {
      try {
            await api.deleteDownloadedVideos(video_id, viewer);
            dispatch(getDownloadedVideos(viewer));
      } catch (error) {
            console.log(error);
      }
}