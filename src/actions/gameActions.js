import axios from "axios";
export const getColors = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_COLORS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/colors`, config);

    dispatch({
      type: "GET_COLORS_SUCCESS",
      payload: data.colors,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "GET_COLORS_FAIL",
      payload: message,
    });
  }
};

export const getNumbers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_NUMBERS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/numbers`, config);

    dispatch({
      type: "GET_NUMBERS_SUCCESS",
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "GET_NUMBERS_FAIL",
      payload: message,
    });
  }
};

export const getGame = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_GAME_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${userInfo.token}`,
    //     },
    //   };

    const { data } = await axios.get(`/api/v1/game`);

    dispatch({
      type: "GET_GAME_SUCCESS",
      payload: data.game,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "GET_GAME_FAIL",
      payload: message,
    });
  }
};
