import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const sendSMSOTP = async (mobile, otp) => {
      try {
            const response = await axios.post("https://www.fast2sms.com/dev/bulkV2",
                  {
                        route: "q",
                        message: `Your otp is ${otp}`,
                        language: "english",
                        flash: 0,
                        numbers: mobile
                  },
                  {
                        headers: {
                              authorization: process.env.FAST2SMS_API_KEY,
                              "Content-Type": "application/json"
                        }
                  }
            );
            // console.log("SMS sent: ", response);
            return response;
      } catch (error) {
            console.error("Fast2SMS Error: ", error.response || error.message);
            throw new Error("SMS sending failed");
      }
}

export default sendSMSOTP;