import express from "express"
import { login, logout, register, verifyOTP } from "../Controllers/Auth.js"
import { getAllChannels, updateChannelData } from "../Controllers/Channel.js"
import { createOrder, successPayment } from "../Controllers/UpgradePlan.js"
import { createOrderForDownloads, successPaymentForDownloads } from "../Controllers/UpgradePlanForDownloads.js"
import { getUserIdsByEmails, saveCallHistory } from "../Controllers/CallHistory.js";
import auth from "../Middleware/Auth.js";

const routes = express.Router()

routes.post("/login", login)
routes.post("/register", register);
routes.post("/verify_otp", verifyOTP);
routes.post("/logout", auth, logout);

routes.patch("/update/:id", updateChannelData)
routes.get("/get_all_channels", getAllChannels)

routes.post("/create_order", createOrder);
routes.post("/success", successPayment);

routes.post("/create_order_downloads", createOrderForDownloads);
routes.post("/success_payment_downloads", successPaymentForDownloads);

routes.post("/save_call_history", saveCallHistory);
routes.post("/get_user_ids", getUserIdsByEmails);

export default routes