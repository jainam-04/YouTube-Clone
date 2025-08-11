import * as api from "../API";

export const saveCallHistory = (callData) => async () => {
      try {
            await api.saveCallHistory(callData);
      } catch (error) {
            console.log("Save Call History Error: ", error.message);
      }
}