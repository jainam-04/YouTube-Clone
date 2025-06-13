import { combineReducers } from "redux"
import authReducer from "./Auth.js"
import currentUserReducer from "./CurrentUser.js"
import channelReducer from "./Channel.js"

export default combineReducers({
      authReducer,
      currentUserReducer,
      channelReducer
})