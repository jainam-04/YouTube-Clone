import mongoose from "mongoose";

const userSchema = mongoose.Schema({
      email: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      mobile_no: {
            type: "String",
            required: true
      },
      name: {
            type: String
      },
      description: {
            type: String
      },
      state: {
            type: String,
            required: true
      },
      joined_on: {
            type: Date,
            default: Date.now
      },
      plan: {
            type: String,
            enum: ["free", "bronze", "silver", "gold"],
            default: "free"
      },
      payment_history: [{
            plan: String,
            amount: Number,
            date: Date,
            invoice_id: String
      }],
      premium_plan: {
            type: String,
            enum: ["free", "daily", "weekly", "monthly", "yearly"],
            default: "free"
      },
      premium_plan_start_date: {
            type: Date
      },
      premium_plan_expiry_date: {
            type: Date
      },
      premium_plan_payment_history: [{
            premium_plan: String,
            amount: Number,
            date: Date,
            invoice_id: String
      }],
      otp: {
            type: String
      },
      otp_expire: {
            type: Date
      },
      is_verified: {
            type: Boolean,
            default: false
      },
      is_logged_in: {
            type: Boolean,
            default: false
      }
})

export default mongoose.model("User", userSchema)