import * as api from "../API"

export const uploadVideo = (videoData) => async (dispatch) => {
      try {
            const { fileData, fileOption } = videoData
            const { data } = await api.uploadVideo(fileData, fileOption)
            dispatch({ type: "POST_VIDEO", data })
            dispatch(getAllVideos());
      } catch (error) {
            alert(error)
      }
}

export const getAllVideos = () => async (dispatch) => {
      try {
            const { data } = await api.getVideos()
            dispatch({ type: "FETCH_ALL_VIDEOS", payload: data })
      } catch (error) {
            console.log(error)
      }
}

export const likeVideo = (likeData) => async (dispatch) => {
      try {
            const { id, like } = likeData;
            const { data } = await api.likeVideo(id, like);
            dispatch({ type: "POST_LIKE", payload: data });
            dispatch(getAllVideos());
      } catch (error) {
            console.log(error)
      }
}

export const viewVideo = (viewData) => async (dispatch) => {
      try {
            const { id } = viewData;
            const { data } = await api.viewVideo(id);
            dispatch({ type: "POST_VIEW", data });
            dispatch(getAllVideos());
      } catch (error) {
            console.log(error)
      }
}