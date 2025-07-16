const initialState = {
      order: null,
      paymentStatus: null,
      premium_plan: null
}

const upgradePlanForDownloadsReducer = (state = initialState, action) => {
      switch (action.type) {
            case "CREATE_ORDER_FOR_DOWNLOADS":
                  return { ...state, order: action.payload };
            case "PAYMENT_SUCCESS_FOR_DOWNLOADS":
                  return { ...state, paymentStatus: "Success", premium_plan: action.payload.premium_plan };
            default:
                  return state;
      }
}

export default upgradePlanForDownloadsReducer;