import React, {useState} from "react";
import "./CreateEditChannel.css";

const CreateEditChannel = ({setEditCreateChannelButton}) => {
  const currentUser = {
    result: {
      _id: 1,
      name: "abc",
      email: "abc@gmail.com",
      joined_on: "07/06/2025",
    },
  };
  const [name, setName] = useState(currentUser?.result?.name);
  const [description, setDescription] = useState(
    currentUser?.result?.description
  );
  const handleSubmit = () => {
    if (!name) {
      alert("Please enter name!!");
    } else if (!description) {
      alert("Please enter description!!");
    } else {
      setEditCreateChannelButton(false);
    }
  };
  return (
    <>
      <div className="Container_CreateEditChannel">
        <input
          type="submit"
          name="text"
          value={"x"}
          className="iButton_X"
          onClick={() => setEditCreateChannelButton(false)}
        />
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
          <input
            type="submit"
            value="submit"
            onClick={handleSubmit}
            className="iButton"
          />
        </div>
      </div>
    </>
  );
};

export default CreateEditChannel;
