import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  changeNickNameReducer,
} from "./reducers/userReducer";
import { openModalReducer } from "./reducers/ModalReducer";
import { RechargeReducer } from "./reducers/RechargeReducer";
import {
  getColorsReducer,
  getNumbersReducer,
  getGameReducer,
} from "./reducers/GameReducer";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetail: userDetailReducer,
  openModals: openModalReducer,

  changeNickName: changeNickNameReducer,
  rechargeUser: RechargeReducer,
  getColor: getColorsReducer,
  getNumber: getNumbersReducer,
  getGames: getGameReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
