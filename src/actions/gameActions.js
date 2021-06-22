import axios from "axios";
import { toast } from "react-toastify";
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

export const createBet =
  (gameId, amount, colorId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "CREATE_BET_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const body = {
        gameId,
        amount,
        colorId,
      };
      const { data } = await axios.post(`api/v1/game/createBet`, body, config);

      dispatch({
        type: "CREATE_BET_SUCCESS",
        payload: data.message,
      });
      toast.success(data.message);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "CREATE_BET_FAIL",
        payload: message,
      });
    }
  };

export const calcResult = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CALC_RESULT_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/game/calcresult/${id}`, config);

    dispatch({
      type: "CALC_RESULT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "CALC_RESULT_FAIL",
      payload: message,
    });
  }
};
