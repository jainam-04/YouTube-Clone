import { combineReducers } from "redux"
import authReducer from "./Auth.js"
import currentUserReducer from "./CurrentUser.js"
import channelReducer from "./Channel.js"
import videoReducer from "./Video.js"
import commentReducer from "./Comments.js"
import historyReducer from "./History.js"

export default combineReducers({
      authReducer,
      currentUserReducer,
      channelReducer,
      videoReducer,
      commentReducer,
      historyReducer
})