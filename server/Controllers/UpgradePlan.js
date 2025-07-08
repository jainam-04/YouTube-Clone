import users from "../Models/Auth.js";
import razorpay from "../config/Razorpay.js";
import sendInvoiceEmail from "../utils/Email.js";

const priceMap = {
      free: 0,
      bronze: 10,
      silver: 50,
      gold: 100
};

export const createOrder = async (req, res) => {
      const { plan } = req.body;
      if (!(plan in priceMap)) {
            return res.status(400).send("Invalid plan...");
      }
      const amount = priceMap[plan];
      if (amount === 0) {
            return res.status(200).send("No amount required...");
      }
      try {
            const order = await razorpay.orders.create({
                  amount: amount * 100,
                  currency: "INR",
                  receipt: `rcpt_id_${Date.now()}`
            });
            res.json(order);
      } catch (error) {
            res.status(405).send(error);
            return;
      }
}

export const successPayment = async (req, res) => {
      const { plan, payment_id, user_id } = req.body;
      const amount = priceMap[plan];
      try {
            const user = await users.findById(user_id);
            if (!user) {
                  return res.status(404).send("User not found...");
            }
            user.plan = plan;
            if (amount > 0) {
                  user.payment_history.push({
                        plan,
                        amount,
                        date: new Date(),
                        invoice_id: payment_id
                  });
                  await sendInvoiceEmail(user, plan, amount, payment_id);
            }
            await user.save();
            res.status(200).send({ message: "Plan upgraded and invoice sent...", plan });
      } catch (error) {
            res.status(405).send("Payment success handling failed...");
            return;
      }
}