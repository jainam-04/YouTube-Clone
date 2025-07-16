import Users from "../Models/Auth.js";
import razorpay from "../config/Razorpay.js";
import sendInvoiceEmail from "../utils/Email.js";

const downloadPriceMap = {
      free: 0,
      daily: 99,
      weekly: 299,
      monthly: 799,
      yearly: 2499
}

export const createOrderForDownloads = async (req, res) => {
      const { premium_plan } = req.body;
      if (!(premium_plan in downloadPriceMap)) {
            return res.status(400).send("Invalid download plan selected...");
      }
      const amount = downloadPriceMap[premium_plan];
      if (amount === 0) {
            return res.status(200).send("No payment required...");
      }
      try {
            const order = await razorpay.orders.create({
                  amount: amount * 100,
                  currency: "INR",
                  receipt: `download_rcpt_${Date.now()}`
            });
            res.status(200).send(order);
      } catch (error) {
            res.status(500).send(error);
            return;
      }
}

export const successPaymentForDownloads = async (req, res) => {
      const { premium_plan, payment_id, user_id } = req.body;
      const amount = downloadPriceMap[premium_plan];
      const now = new Date();
      const premiumPlanDuration = {
            free: 0,
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
      };
      if (!(premium_plan in premiumPlanDuration)) {
            return res.status(400).send("Invalid premium plan duration...");
      }
      const durationInDays = premiumPlanDuration[premium_plan];
      try {
            const user = await Users.findById(user_id);
            if (!user) {
                  return res.status(404).send("User not found...");
            }
            user.premium_plan = premium_plan;
            if (amount > 0) {
                  const startDate = now;
                  const expiryDate = new Date(startDate);
                  expiryDate.setDate(startDate.getDate() + durationInDays);
                  user.premium_plan_start_date = startDate;
                  user.premium_plan_expiry_date = expiryDate;
                  user.premium_plan_payment_history.push({
                        premium_plan,
                        amount,
                        date: now,
                        invoice_id: payment_id
                  });
                  await sendInvoiceEmail(user, premium_plan, amount, payment_id);
            }
            await user.save();
            res.status(200).send({ message: "Premium plan upgraded and invoice sent...", premium_plan });
      } catch (error) {
            res.status(500).send(error);
            return;
      }
}