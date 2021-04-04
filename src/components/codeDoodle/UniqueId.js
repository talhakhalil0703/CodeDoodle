// import { useSelector, useDispatch } from "react-redux";
// import { getNewId, selectId } from "./idSlice";

let lastId = 0;

export default function () {
  return lastId++;
}
