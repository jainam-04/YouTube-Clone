import users from "../Models/Auth.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

export const login = async (req, res) => {
      const { email, password } = req.body;
      // try {
      //       const existingUser = await users.findOne({ email })
      //       if (!existingUser) {
      //             try {
      //                   const newUser = await users.create({ email })
      //                   const token = jwt.sign({
      //                         email: newUser.email,
      //                         id: newUser._id
      //                   }, process.env.JWT_SECRET_KEY, {
      //                         expiresIn: "1hr"
      //                   })
      //                   res.status(200).json({ result: newUser, token })
      //             } catch (error) {
      //                   res.status(500).json({ message: "Something went wrong..." })
      //                   return
      //             }
      //       }
      //       else {
      //             const token = jwt.sign({
      //                   email: existingUser.email,
      //                   id: existingUser._id
      //             }, process.env.JWT_SECRET_KEY, {
      //                   expiresIn: "1hr"
      //             })
      //             res.status(200).json({ result: existingUser, token })
      //       }
      // }
      // catch (error) {
      //       res.status(500).json({ message: "Something went wrong..." })
      //       return
      // }
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
            const token = jwt.sign({
                  id: existingUser._id,
                  email: existingUser.email,
                  state: existingUser.state
            }, process.env.JWT_SECRET_KEY, {
                  expiresIn: "1h"
            });
            console.log(`Login success for: ${email}`);
            res.status(200).json({ result: existingUser, token });
      } catch (error) {
            console.log(`Login Error: ${error.message}`);
            res.status(500).json({ message: "Something went wrong..." });
      }
}

export const register = async (req, res) => {
      const { email, password, state } = req.body;
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
                  state
            });
            const token = jwt.sign({
                  id: newUser._id,
                  email: newUser.email,
                  state: newUser.state
            }, process.env.JWT_SECRET_KEY, {
                  expiresIn: "1h"
            });
            console.log(`Registration successful for: ${email}`);
            res.status(200).json({ result: newUser, token });
      } catch (error) {
            console.log(`Registration Error: ${error.message}`);
            res.status(500).json({ message: "Something went wrong..." });
      }
}