import * as api from "../API"
import { setCurrentUser } from "./CurrentUser.js";

export const fetchAllChannels = () => async (dispatch) => {
      try {
            const { data } = await api.fetchAllChannels();
            dispatch({ type: "FETCH_CHANNELS", payload: data })
      } catch (error) {
            console.log(error)
      }
}

export const updateChannelData = (id, updateData) => async (dispatch) => {
      try {
            const { data } = await api.updateChannelData(id, updateData);
            dispatch({ type: "UPDATE_DATA", payload: data });
            const oldProfile = JSON.parse(localStorage.getItem("profile"));
            const newProfile = { ...oldProfile, result: data };
            dispatch(setCurrentUser(newProfile));
            localStorage.setItem("profile", JSON.stringify(newProfile));
      } catch (error) {
            console.log(error)
      }
}