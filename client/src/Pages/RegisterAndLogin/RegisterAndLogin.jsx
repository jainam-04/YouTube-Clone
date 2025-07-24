import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {login, register} from "../../Action/Auth.js";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import "./RegisterAndLogin.css";
import {useNavigate} from "react-router-dom";

const RegisterAndLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    email: "",
    password: "",
  });
  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
    setFormData({state: "", email: "", password: ""});
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, state} = formData;
    if (!email || !password || (isSignUp && !state)) {
      alert("Please fill all required fields...");
      return;
    }
    if (isSignUp) {
      dispatch(register({state, email, password}, navigate));
    } else {
      dispatch(login({email, password}, navigate));
    }
  };
  return (
    <div className="Container_Pages_App">
      <LeftSideBar />
      <div className="Auth_Form_Container">
        <form onSubmit={handleSubmit} className="Auth_Form">
          <h2>{isSignUp ? "Create an account" : "Login to your account"}</h2>
          {isSignUp && (
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignUp ? "Register" : "Login"}</button>
          <p className="Switch_Auth_Mode" onClick={handleSwitch}>
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterAndLogin;
