const downloadedVideosReducer = (state = { data: null }, action) => {
      switch (action.type) {
            case "POST_DOWNLOADED_VIDEOS":
                  return { ...state, data: action.payload };
            case "FETCH_ALL_DOWNLOADED_VIDEOS":
                  return { ...state, data: action.payload };
            default:
                  return state;
      }
}

export default downloadedVideosReducer;