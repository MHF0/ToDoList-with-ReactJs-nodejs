import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  COD: CODReducer,
});

export default rootReducer;
