import express from "express"
import { login, register, verifyOTP } from "../Controllers/Auth.js"
import { getAllChannels, updateChannelData } from "../Controllers/Channel.js"
import { createOrder, successPayment } from "../Controllers/UpgradePlan.js"
import { createOrderForDownloads, successPaymentForDownloads } from "../Controllers/UpgradePlanForDownloads.js"

const routes = express.Router()

routes.post("/login", login)
routes.post("/register", register);
routes.post("/verify_otp", verifyOTP);

routes.patch("/update/:id", updateChannelData)
routes.get("/get_all_channels", getAllChannels)

routes.post("/create_order", createOrder);
routes.post("/success", successPayment);

routes.post("/create_order_downloads", createOrderForDownloads);
routes.post("/success_payment_downloads", successPaymentForDownloads);

export default routes