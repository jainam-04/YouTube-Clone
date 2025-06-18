import * as api from "../API";

export const addToWatchLater = (watchLaterData) => async (dispatch) => {
      try {
            const { data } = await api.addToWatchLater(watchLaterData);
            dispatch({ type: "POST_WATCH_LATER", data });
            dispatch(getAllWatchLater());
      } catch (error) {
            console.log(error);
      }
}

export const getAllWatchLater = () => async (dispatch) => {
      try {
            const { data } = await api.getAllWatchLater();
            dispatch({ type: "FETCH_ALL_WATCH_LATER", payload: data });
      } catch (error) {
            console.log(error);
      }
}

export const deleteWatchLater = (watchLaterData) => async (dispatch) => {
      try {
            const { video_id, viewer } = watchLaterData;
            await api.deleteWatchLater(video_id, viewer);
            dispatch(getAllWatchLater());
      } catch (error) {
            console.log(error);
      }
}