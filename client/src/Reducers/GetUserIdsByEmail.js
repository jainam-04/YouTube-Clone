const initialState = {
      loading: false,
      callerId: null,
      receiverId: null,
      error: null
};

const userIdReducer = (state = initialState, action) => {
      switch (action.type) {
            case "FETCH_USER_IDS_REQUEST":
                  return { ...state, loading: true, error: null };
            case "FETCH_USER_IDS_SUCCESS":
                  return { ...state, loading: false, callerId: action.payload.callerId, receiverId: action.payload.receiverId };
            case "FETCH_USER_IDS_FAIL":
                  return { ...state, loading: false, error: action.payload };
            default:
                  return state;
      }
}

export default userIdReducer;