import users from "../Models/Auth.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import sendEmailOTP from "../utils/SendOTPViaEmail.js";
import sendSMSOTP from "../utils/SendOTPViaSMS.js";

const southIndianStates = ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana"];

const sendOTP = async (user) => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpire = Date.now() + 5 * 60 * 1000;
      user.otp = otp;
      user.otp_expire = otpExpire;
      user.is_verified = false;
      await user.save();
      if (southIndianStates.includes(user.state)) {
            await sendEmailOTP(user.email, otp);
      }
      else {
            await sendSMSOTP(user.mobile_no, otp);
      }
}

export const login = async (req, res) => {
      const { email, password } = req.body;
      try {
            const existingUser = await users.findOne({ email });
            if (!existingUser) {
                  console.log(`Login failed - User not found: ${email}`);
                  return res.status(404).json({ message: "User does not exists..." });
            }
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordCorrect) {
                  console.log(`Login failed - rrect password for: ${email}`);
                  return res.status(401).json({ message: "Invalid Password..." });
            }
            await sendOTP(existingUser);
            console.log(`Login success for: ${email}`);
            res.status(200).json({ message: "OTP sent for login verification", user_id: existingUser._id });
      } catch (error) {
            console.log(`Login Error: ${error.message}`);
            res.status(500).json({ message: "Something went wrong..." });
      }
}

export const logout = async (req, res) => {
      try {
            const userId = req.user_id;
            const user = await users.findById(userId);
            if (!user) {
                  console.log("User not found during logout");
                  return res.status(404).json({ message: "User not found" });
            }
            if (user) {
                  user.is_logged_in = false;
                  await user.save();
            }
            if (req.expired) {
                  console.log("Token was expired but user marked as logged out");
                  return res.status(200).json({ message: "Token expired, user logged out locally" });
            }
            console.log("User logged out successfully");
            res.status(200).json({ message: "User logged out successfully" });
      } catch (error) {
            console.log("Logout Error: ", error.message);
            res.status(500).json({ message: error.message });
      }
}

export const register = async (req, res) => {
      const { email, password, state, mobile_no } = req.body;
      try {
            const existingUser = await users.findOne({ email });
            if (existingUser) {
                  console.log(`Registration failed - Email already registered: ${email}`);
                  return res.status(400).json({ message: "User already exists..." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await users.create({
                  email,
                  password: hashedPassword,
                  state,
                  mobile_no,
            });
            await sendOTP(newUser);
            console.log(`Registration successful for: ${email}`);
            res.status(200).json({ message: "OTP sent for verification", user_id: newUser._id });
      } catch (error) {
            console.log(`Registration Error: ${error.message}`);
            res.status(500).json({ message: "Something went wrong..." });
      }
}

export const verifyOTP = async (req, res) => {
      const { user_id, otp } = req.body;
      try {
            const user = await users.findById(user_id);
            if (!user) {
                  console.log(`Verification of otp failed - User not found: ${user_id}`);
                  return res.status(404).json({ message: "User not found..." });
            }
            if (!user.otp || user.otp_expire < Date.now()) {
                  console.log(`Verification of otp failed - OTP expired`);
                  return res.status(400).json({ message: "OTP expired. Please login/register again..." });
            }
            if (user.otp !== otp) {
                  console.log(`Verification of otp failed - Invalid otp: ${otp}`);
                  return res.status(401).json({ message: "Invalid otp..." });
            }
            user.otp = null;
            user.otp_expire = null;
            user.is_verified = true;
            user.is_logged_in = true;
            await user.save();
            const token = jwt.sign({
                  id: user._id,
                  email: user.email,
                  state: user.state,
                  mobile_no: user.mobile_no
            }, process.env.JWT_SECRET_KEY, {
                  expiresIn: "1h"
            });
            console.log(`OTP verification successful for: ${user_id}`);
            res.status(200).json({ message: "OTP verified successfully", result: user, token });
      } catch (error) {
            console.log(`OTP verification error: ${error.message}`);
            res.status(500).json({ message: "Something went wrong..." });
      }
}