import React, {useState} from "react";
import "./CreateEditChannel.css";
import {useSelector} from "react-redux";
import {updateChannelData} from "../../Action/ChannelUser.js";
import {useDispatch} from "react-redux";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime.js";

const CreateEditChannel = ({setEditCreateChannelButton}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const state = currentUser?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  const [name, setName] = useState(currentUser?.result?.name || "");
  const [description, setDescription] = useState(
    currentUser?.result?.description || ""
  );
  const handleSubmit = () => {
    if (!name) {
      alert("Please enter name!!");
    } else if (!description) {
      alert("Please enter description!!");
    } else {
      dispatch(
        updateChannelData(currentUser?.result._id, {
          name: name,
          description: description,
        })
      );
      setEditCreateChannelButton(false);
    }
  };
  return (
    <div className={theme}>
      <div className="Container_CreateEditChannel">
        <button
          className="iButton_X"
          name="text"
          onClick={() => setEditCreateChannelButton(false)}
        >
          X
        </button>
        <div className="Container2_CreateEditChannel">
          <h1>
            {currentUser?.result?.name ? <>Edit</> : <>Create</>} Your Channel
          </h1>
          <input
            type="text"
            placeholder="Enter your channel name"
            name="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="iBox"
          />
          <textarea
            type="text"
            placeholder="Enter your channel description"
            rows={15}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="iBox"
          ></textarea>
          <button
            className="iButton"
            style={{color: "white"}}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditChannel;
