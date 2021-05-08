import axios from "axios";
import { toast } from "react-toastify";

export const register = (mobile, email, password, referrerCode) => async (
  dispatch
) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/register",
      { mobile, email, password, referrerCode },
      config
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/login",
      { email, password },
      config
    );

    console.log(data);

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/v1/auth/me`, config);
    console.log(res.data.data);

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: res.data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: message,
    });
  }
};

export const changeNickName = (id, nickName) => async (dispatch, getState) => {
  console.log(id, nickName);
  try {
    dispatch({
      type: "CHANGE_NICKNAME_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const body = {
      nickName,
    };

    const { data } = await axios.put(
      `/api/v1/auth/${id}/changenickname`,
      body,
      config
    );

    console.log(data);

    dispatch({
      type: "CHANGE_NICKNAME_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CHANGE_NICKNAME_FAIL",
      payload: message,
    });
  }
};
