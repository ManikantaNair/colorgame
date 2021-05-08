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
