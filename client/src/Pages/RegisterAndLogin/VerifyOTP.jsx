import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./RegisterAndLogin.css";
import {verifyOtp} from "../../Action/Auth.js";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));
    if (!pendingUser) {
      alert("No pending user found. Please login/register again...");
      navigate("/auth");
      return;
    }
    dispatch(verifyOtp({user_id: pendingUser.user_id, otp}, navigate));
  };
  return (
    <div className="Container_Pages_App">
      <div className="Auth_Form_Container">
        <form onSubmit={handleSubmit} className="Auth_Form">
          <h2>Enter OTP</h2>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
