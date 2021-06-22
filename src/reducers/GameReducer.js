export const getColorsReducer = (state = { colors: [] }, action) => {
  switch (action.type) {
    case "GET_COLORS_REQUEST":
      return { loading: true };
    case "GET_COLORS_SUCCESS":
      return { loading: false, colors: action.payload };
    case "GET_COLORS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getNumbersReducer = (state = { numbers: [] }, action) => {
  switch (action.type) {
    case "GET_NUMBERS_REQUEST":
      return { loading: true };
    case "GET_NUMBERS_SUCCESS":
      return { loading: false, numbers: action.payload };
    case "GET_NUMBERS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getGameReducer = (state = { game: {} }, action) => {
  switch (action.type) {
    case "GET_GAME_REQUEST":
      return { loading: true };
    case "GET_GAME_SUCCESS":
      return { loading: false, game: action.payload };
    case "GET_GAME_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createBetReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_BET_REQUEST":
      return { loading: true };
    case "CREATE_BET_SUCCESS":
      return { loading: false, betUpdate: action.payload };
    case "CREATE_BET_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const calcResultReducer = (state = {}, action) => {
  switch (action.type) {
    case "CALC_RESULT_REQUEST":
      return { loading: true };
    case "CALC_RESULT_SUCCESS":
      return { loading: false };
    case "CALC_RESULT_FAIL":
      return { loading: false };

    default:
      return state;
  }
};
