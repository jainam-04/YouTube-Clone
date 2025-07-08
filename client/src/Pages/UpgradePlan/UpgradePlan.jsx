import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {createOrder, successPayment} from "../../Action/UpgradePlan.js";
import {launchRazorpay} from "../../Utils/Razorpay.js";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar.jsx";
import "./UpgradePlan.css";

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

const UpgradePlan = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const handleUpgrade = async (plan) => {
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
  return (
    <div className="Container_Pages_App">
      <LeftSideBar />
      <div className="Upgrade_Container">
        <h2>Upgrade Your Plan</h2>
        <div className="Plans_Wrapper">
          {plans.map((plan) => (
            <div key={plan.name} className="Plan_Card">
              <h3>{plan.name.toUpperCase()}</h3>
              <p>₹{plan.price}</p>
              <button onClick={() => handleUpgrade(plan)}>Upgrade</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
