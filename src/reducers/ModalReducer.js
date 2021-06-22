export const openModalReducer = (state = { openModal: false }, action) => {
  switch (action.type) {
    case "MODAL_OPEN":
      return { openModal: true };
    case "MODAL_CLOSE":
      return { openModal: false };
    default:
      return state;
  }
};

export const openBetModalReducer = (
  state = { openBetModal: false },
  action
) => {
  switch (action.type) {
    case "BET_MODAL_OPEN":
      return { openBetModal: true };
    case "BET_MODAL_CLOSE":
      return { openBetModal: false };
    default:
      return state;
  }
};

export const colorTypeReducer = (
  state = { colorType: "", colorId: "" },
  action
) => {
  switch (action.type) {
    case "COLOR_TYPE":
      return {
        colorType: action.payload.colorType,
        colorId: action.payload.colorId,
      };

    default:
      return state;
  }
};

export const buttonNumberReducer = (state = { number: 10 }, action) => {
  switch (action.type) {
    case "NUMBER":
      return {
        number: action.payload,
      };

    default:
      return state;
  }
};
