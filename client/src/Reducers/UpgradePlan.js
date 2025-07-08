const initialState = {
      order: null,
      paymentStatus: null,
      plan: null
}

const upgradePlanReducer = (state = initialState, action) => {
      switch (action.type) {
            case "CREATE_ORDER":
                  return { ...state, order: action.payload };
            case "PAYMENT_SUCCESS":
                  return { ...state, paymentStatus: "success", plan: action.payload.plan };
            default:
                  return state;
      }
}

export default upgradePlanReducer;