import nodemailer from "nodemailer";

const sendInvoiceEmail = async (user, plan, amount, payment_id) => {
      const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS
            }
      });

      const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: `Invoice for ${plan} plan`,
            text: `Thank you for upgrading to the ${plan} plan.\nAmount: ${amount}\nPayment ID: ${payment_id}`
      };

      await transporter.sendMail(mailOptions);
}

export default sendInvoiceEmail;