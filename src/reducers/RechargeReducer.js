export const RechargeReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_BALANCE_REQUEST":
      return { loading: true };
    case "GET_BALANCE_SUCCESS":
      return { loading: false, balance: action.payload };
    case "GET_BALANCE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
