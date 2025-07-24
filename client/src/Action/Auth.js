import * as api from "../API";
import { setCurrentUser } from "./CurrentUser";

export const login = (authData, navigate) => async (dispatch) => {
      try {
            const { data } = await api.login(authData)
            dispatch({ type: "AUTH", data })
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem("profile"))))
            navigate("/");
      } catch (error) {
            alert(error?.response?.data?.message || "Login failed. Please try again...");
      }
}

export const register = (authData, navigate) => async (dispatch) => {
      try {
            const { data } = await api.register(authData);
            dispatch({ type: "AUTH", data });
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem("profile"))));
            navigate("/");
      } catch (error) {
            alert(error?.response?.data?.message || "Registration failed. Please try again...");
      }
}