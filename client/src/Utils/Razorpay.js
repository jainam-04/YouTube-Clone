export const launchRazorpay = ({ key, amount, order_id, name, description, plan, onSuccess }) => {
      const options = {
            key,
            amount,
            currency: "INR",
            name,
            description,
            order_id: order_id,
            handler: async function (response) {
                  await onSuccess(response)
            },
            theme: {
                  color: "#c42428"
            }
      };
      const razor = new window.Razorpay(options);
      razor.open();
}