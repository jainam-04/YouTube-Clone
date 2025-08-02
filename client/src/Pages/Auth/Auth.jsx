import React from "react";
import {BiLogOut} from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom";
import "./Auth.css";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../../Action/CurrentUser";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime";

const Auth = ({user, setEditCreateChannelButton, setAuthButton}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = user?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  const logout = () => {
    dispatch(setCurrentUser(null));
    localStorage.clear();
    setAuthButton(false);
    navigate("/");
  };
  return (
    <div className={theme}>
      <div className="Auth_Container" onClick={() => setAuthButton(false)}>
        <div className="Auth_Container2" onClick={(e) => e.stopPropagation()}>
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
                  <Link
                    to={`/channel/${user?.result?._id}`}
                    className="Button_Auth"
                    onClick={() => setAuthButton(false)}
                  >
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
                  onClick={() => {
                    setEditCreateChannelButton(true);
                    setAuthButton(false);
                  }}
                />
              </>
            )}
            <div>
              <div className="Button_Auth" onClick={() => logout()}>
                <BiLogOut />
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
