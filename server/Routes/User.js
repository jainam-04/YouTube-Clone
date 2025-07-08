import express from "express"
import { login } from "../Controllers/Auth.js"
import { getAllChannels, updateChannelData } from "../Controllers/Channel.js"
import { createOrder, successPayment } from "../Controllers/UpgradePlan.js"

const routes = express.Router()

routes.post("/login", login)

routes.patch("/update/:id", updateChannelData)
routes.get("/get_all_channels", getAllChannels)

routes.post("/create_order", createOrder);
routes.post("/success", successPayment);

export default routes