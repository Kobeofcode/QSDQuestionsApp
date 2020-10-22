import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import itemReducer from "./itemReducer"

const rootReducer = combineReducers({
    auth:authReducer,
    error:errorReducer,
    item:itemReducer
})


export default rootReducer;