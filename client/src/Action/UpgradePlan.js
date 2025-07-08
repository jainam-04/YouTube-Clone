import * as api from "../API";

export const createOrder = (plan) => async (dispatch) => {
      try {
            const { data } = await api.createOrder(plan);
            dispatch({ type: "CREATE_ORDER", payload: data });
            return data;
      } catch (error) {
            console.log(error);
      }
}

export const successPayment = (plan, payment_id, user_id) => async (dispatch) => {
      try {
            const { data } = await api.successPayment(plan, payment_id, user_id);
            dispatch({ type: "PAYMENT_SUCCESS", payload: data });
      } catch (error) {
            console.log(error);
      }
}