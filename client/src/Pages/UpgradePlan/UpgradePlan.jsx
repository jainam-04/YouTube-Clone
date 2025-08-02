import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {createOrder, successPayment} from "../../Action/UpgradePlan.js";
import {launchRazorpay} from "../../Utils/Razorpay.js";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar.jsx";
import "./UpgradePlan.css";
import {
  createOrderForDownloads,
  successPaymentForDownloads,
} from "../../Action/UpgradePlanForDownloads.js";
import changeThemeBasedOnTime from "../../Utils/ChangeThemeBasedOnTime.js";

const plans = [
  {
    name: "free",
    price: 0,
  },
  {
    name: "bronze",
    price: 10,
  },
  {
    name: "silver",
    price: 50,
  },
  {
    name: "gold",
    price: 100,
  },
];

const premiumPlans = [
  {
    name: "free",
    price: 0,
  },
  {
    name: "daily",
    price: 99,
  },
  {
    name: "weekly",
    price: 299,
  },
  {
    name: "monthly",
    price: 799,
  },
  {
    name: "yearly",
    price: 2499,
  },
];

const UpgradePlan = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const state = user?.result?.state;
  const theme = changeThemeBasedOnTime(state);
  const handleUpgradePlan = async (plan) => {
    try {
      if (plan.name === "free") {
        await dispatch(
          successPayment(plan.name, "FREE_PLAN", user?.result?._id)
        );
        alert("Free plan selected. No payment required...");
        return;
      }
      const order = await dispatch(createOrder(plan.name));
      if (!order || !order.amount || !order.id) {
        alert("Order creation failed...");
        return;
      }
      launchRazorpay({
        key: "rzp_test_3ADYYRz0xNO29Y",
        amount: order.amount,
        order_id: order.id,
        name: "Youtube Clone",
        description: `Upgrade to ${plan.name} plan`,
        plan,
        onSuccess: (response) => {
          dispatch(
            successPayment(
              plan.name,
              response.razorpay_payment_id,
              user?.result?._id
            )
          );
          alert(`Successfully upgraded to ${plan.name} plan...`);
        },
      });
    } catch (error) {
      console.log(error);
      alert("Upgrade failed...");
    }
  };
  const handleUpgradePremiumPlan = async (premium_plan) => {
    try {
      if (premium_plan.name === "free") {
        await dispatch(
          successPaymentForDownloads(
            premium_plan.name,
            "FREE_USER",
            user?.result?._id
          )
        );
        alert("Free plan selected. No payment required...");
        return;
      }
      const order = await dispatch(createOrderForDownloads(premium_plan.name));
      if (!order || !order.amount || !order.id) {
        alert("Order creation failed...");
        return;
      }
      launchRazorpay({
        key: "rzp_test_3ADYYRz0xNO29Y",
        amount: order.amount,
        order_id: order.id,
        name: "Youtube Clone",
        description: `Upgrade to ${premium_plan.name} premium plan`,
        premium_plan,
        onSuccess: (response) => {
          dispatch(
            successPaymentForDownloads(
              premium_plan.name,
              response.razorpay_payment_id,
              user?.result?._id
            )
          );
          alert(
            `Successfully upgraded to ${premium_plan.name} premium plan...`
          );
        },
      });
    } catch (error) {
      console.log(error);
      alert("Upgrade failed...");
    }
  };
  return (
    <div className={theme}>
      <div className="Container_Pages_App">
        <LeftSideBar />
        <div className="Upgrade_Container">
          <h2>Upgrade Your Plan</h2>
          <div className="Plans_Wrapper">
            {plans.map((plan) => (
              <div key={plan.name} className="Plan_Card">
                <h3>{plan.name.toUpperCase()}</h3>
                <p>₹{plan.price}</p>
                <button onClick={() => handleUpgradePlan(plan)}>Upgrade</button>
              </div>
            ))}
          </div>
        </div>
        <div className="Upgrade_Container">
          <h2>Upgrade your premium plan</h2>
          <div className="Plans_Wrapper">
            {premiumPlans.map((premium_plan) => (
              <div key={premium_plan.name} className="Plan_Card">
                <h3>{premium_plan.name.toUpperCase()}</h3>
                <p>₹{premium_plan.price}</p>
                <button onClick={() => handleUpgradePremiumPlan(premium_plan)}>
                  Upgrade
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
