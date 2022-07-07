import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import checkReducer from "./checkReducer4";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  status: checkReducer
});
