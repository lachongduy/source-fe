import { cartSlice } from "./cartSlice";

const { actions } = cartSlice;
export const addToCart = (data) => (dispatch) => {
  dispatch(actions.addToCart(data));
};
export const deleteToCart = (data) => (dispatch) => {
  dispatch(actions.deleteToCart(data));
};
export const decreaseCart = (data) => (dispatch) => {
  dispatch(actions.decreaseCart(data));
};
export const increaseCart = (data) => (dispatch) => {
  dispatch(actions.increaseCart(data));
};
export const clearCart = (data) => (dispatch) => {
  dispatch(actions.clearCart(data));
};
export const deleteAllCartWhilePaymentSuccess = () => (dispatch) => {
  dispatch(actions.deleteAllCartWhilePaymentSuccess());
};
export const getTotal = (data) => (dispatch) => {
  dispatch(actions.getTotals(data));
};
