import React from "react";
import {BiLogOut} from "react-icons/bi";
import {Link} from "react-router-dom";
import "./Auth.css"

const Auth = ({user, setEditCreateChannelButton, setAuthButton}) => {
  return (
    <>
      <div
        className="Auth_Container"
        onClick={() => {
          setAuthButton(false);
        }}
      >
        <div className="Auth_Container2">
          <p className="User_Details">
            <div className="Channel_Logo_App">
              <p className="First_Char_Logo_App">
                {user?.result.name ? (
                  <>{user?.result.name.charAt(0).toUpperCase()}</>
                ) : (
                  <>{user?.result.email.charAt(0).toUpperCase()}</>
                )}
              </p>
            </div>
            <div className="Email_Auth">{user?.result.email}</div>
          </p>
          <div className="Buttons_Auth">
            {user?.result.name ? (
              <>
                {
                  <Link to={"/"} className="Button_Auth">
                    Your Channel
                  </Link>
                }
              </>
            ) : (
              <>
                <input
                  type="submit"
                  className="Button_Auth"
                  value="Create Your Channel"
                  onClick={() => setEditCreateChannelButton(true)}
                />
              </>
            )}
            <div>
              <div className="Button_Auth">
                <BiLogOut />
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
