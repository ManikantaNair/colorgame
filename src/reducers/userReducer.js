export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, userDetails: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    // case "USER_DETAIL_RESET":
    //   return { user: {} };
    default:
      return state;
  }
};

export const changeNickNameReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME_REQUEST":
      return { loading: true };
    case "CHANGE_NICKNAME_SUCCESS":
      return { loading: false, success: true, nickname: action.payload };
    case "CHANGE_NICKNAME_FAILURE":
      return { loading: false, error: action.payload };
    case "REMOVE_NICKNAME":
      return { ...state, loading: true, success: false };
    default:
      return state;
  }
};
