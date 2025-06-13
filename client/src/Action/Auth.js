import * as api from "../API";
import { setCurrentUser } from "./CurrentUser";

export const login = (authData) => async (dispatch) => {
      try {
            const { data } = await api.login(authData)
            dispatch({ type: "AUTH", data })
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem("profile"))))
      } catch (error) {
            alert(error)
      }
}