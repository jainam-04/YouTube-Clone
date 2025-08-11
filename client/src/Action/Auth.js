import * as api from "../API";
import { setCurrentUser } from "./CurrentUser";

export const login = (authData, navigate) => async () => {
      try {
            const { data } = await api.login(authData);
            console.log(data);
            localStorage.setItem("pendingUser", JSON.stringify({ ...data }));
            navigate("/verify_otp");
      } catch (error) {
            alert(error?.response?.data?.message || "Login failed. Please try again...");
      }
}

export const register = (authData, navigate) => async () => {
      try {
            const { data } = await api.register(authData);
            console.log(data);
            localStorage.setItem("pendingUser", JSON.stringify({ ...data }));
            navigate("/verify_otp");
      } catch (error) {
            alert(error?.response?.data?.message || "Registration failed. Please try again...");
      }
}

export const logout = (navigate) => async () => {
      try {
            await api.logout();
            localStorage.clear();
            navigate("/");
      } catch (error) {
            alert(error?.response?.data?.message || "Logout failed. Please try again...");
      }
}

export const verifyOtp = (otpData, navigate) => async (dispatch) => {
      try {
            const { data } = await api.verifyOtp(otpData);
            localStorage.removeItem("pendingUser");
            dispatch({ type: "AUTH", data });
            dispatch(setCurrentUser(data));
            navigate("/");
      } catch (error) {
            alert(error?.response?.data?.message || "OTP verification failed. Please try again...");
      }
}