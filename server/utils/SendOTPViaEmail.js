import nodemailer from "nodemailer";

const sendEmailOTP = async (email, otp) => {
      const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS
            }
      });

      const mailOptions={
            from: process.env.EMAIL_USER,
            to: email,
            subject:"Your OTP for verification",
            html:`<h3>Your OTP is ${otp}.</h3><p>Expires in 5 minutes.</p>`
      };

      await transporter.sendMail(mailOptions);
}

export default sendEmailOTP;