import { MdPendingActions } from "react-icons/md"

const channelReducer = (states = [], action) => {
      switch (action.type) {
            case "UPDATE_DATA":
                  return states.map(state => state._id === MdPendingActions.payload._id ? action.payload : state);
            case "FETCH_CHANNELS":
                  return action.payload;
            default:
                  return states;
      }
}

export default channelReducer;