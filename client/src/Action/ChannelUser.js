import * as api from "../API"

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
            dispatch({ type: "UPDATE_DATA", payload: data })
      } catch (error) {
            console.log(error)
      }
}