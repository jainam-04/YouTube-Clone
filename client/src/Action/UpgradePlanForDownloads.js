import * as api from "../API";

export const createOrderForDownloads = (premium_plan) => async (dispatch) => {
      try {
            const { data } = await api.createOrderForDownloads(premium_plan);
            dispatch({ type: "CREATE_ORDER_FOR_DOWNLOADS", payload: data });
            return data;
      } catch (error) {
            console.log(error);
      }
}

export const successPaymentForDownloads = (premium_plan, payment_id, user_id) => async (dispatch) => {
      try {
            const { data } = await api.successPaymentForDownloads(premium_plan, payment_id, user_id);
            dispatch({ type: "PAYMENT_SUCCESS_FOR_DOWNLOADS", payload: data });
      } catch (error) {
            console.log(error);
      }
}