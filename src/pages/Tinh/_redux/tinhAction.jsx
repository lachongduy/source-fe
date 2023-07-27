import { tinhSlice } from "./tinhSlice";
const { actions } = tinhSlice;
export const getAllTinh = () => (dispatch) => {
  return fetch("https://provinces.open-api.vn/api/?depth=3")
    .then((res) => res.json())
    .then((data) => dispatch(actions.tinhList({ data })));
};
