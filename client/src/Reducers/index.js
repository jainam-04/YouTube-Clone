import { combineReducers } from "redux"
import authReducer from "./Auth.js"
import currentUserReducer from "./CurrentUser.js"
import channelReducer from "./Channel.js"
import videoReducer from "./Video.js"
import commentReducer from "./Comments.js"
import historyReducer from "./History.js"
import likedVideoReducer from "./LikedVideo.js"
import watchLaterReducer from "./WatchLater.js"
import upgradePlanReducer from "./UpgradePlan.js"
import downloadedVideosReducer from "./DownloadedVideos.js"
import upgradePlanForDownloadsReducer from "./UpgradePlanForDownloads.js"

export default combineReducers({
      authReducer,
      currentUserReducer,
      channelReducer,
      videoReducer,
      commentReducer,
      historyReducer,
      likedVideoReducer,
      watchLaterReducer,
      upgradePlanReducer,
      downloadedVideosReducer,
      upgradePlanForDownloadsReducer
});