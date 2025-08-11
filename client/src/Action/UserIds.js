import * as api from "../API";

export const getUserIdsByEmails = (callerEmail, receiverEmail) => async (dispatch) => {
      try {
            dispatch({ type: "FETCH_USER_IDS_REQUEST" });
            const { data } = await api.getUserIdsByEmails(callerEmail, receiverEmail);
            console.log("API Response: ", data);
            dispatch({
                  type: "FETCH_USER_IDS_SUCCESS", payload: {
                        callerId: data.callerId,
                        receiverId: data.receiverId
                  }
            });
      } catch (error) {
            dispatch({ type: "FETCH_USER_IDS_FAIL", payload: error.message });
            console.log("User ids fetching error: ", error.message);
      }
}