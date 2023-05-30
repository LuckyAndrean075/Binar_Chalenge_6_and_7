import { combineReducers } from "@reduxjs/toolkit";
import post from "./post";
import banner from "./banner";
import auth from "./auth";

export default combineReducers({
  banner,
  post,
  auth,
});
