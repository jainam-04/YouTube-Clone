const watchLaterReducer = (state = { data: null }, action) => {
      switch (action.type) {
            case "POST_WATCH_LATER":
                  return { ...state, data: action?.data };
            case "FETCH_ALL_WATCH_LATER":
                  return { ...state, data: action?.payload };
            default:
                  return state;
      }
}

export default watchLaterReducer;