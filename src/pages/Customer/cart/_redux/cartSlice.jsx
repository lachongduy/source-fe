import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialCartState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  cartForEdit: undefined,
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartId: undefined,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
        state.data = null;
      } else {
        state.actionsLoading = true;
      }
    },
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.colors._id === action.payload.colors._id &&
          item.sizes._id === action.payload.sizes._id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity += action.payload.cartQuantity;
        toast.info(
          `${state.cart[itemIndex].name} được tăng thêm ${action.payload.cartQuantity}`,
          {
            position: "top-right",
          }
        );
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: action.payload.cartQuantity,
        };
        state.cart.push(tempProduct);
        toast.success(
          `${action.payload.cartQuantity} sản phẩm ${action.payload.name} đã thêm vào giỏ hàng`,
          {
            position: "top-right",
          }
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    deleteToCart: (state, action) => {
      const nextCartItems = state.cart.filter(
        (item) => !(item._id === action.payload._id &&
          item.colors._id === action.payload.colors._id &&
          item.sizes._id === action.payload.sizes._id)
      );
      state.cart = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      toast.error(`${action.payload.name} đã xóa khỏi giỏ hàng`, {
        position: "top-right",
      });
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.colors._id === action.payload.colors._id &&
          item.sizes._id === action.payload.sizes._id
      );
      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        toast.error("Số lượng sản phẩm đã đạt mức tối thiểu");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    increaseCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.colors._id === action.payload.colors._id &&
          item.sizes._id === action.payload.sizes._id
      );
      if (state.cart[itemIndex].cartQuantity >= 1) {
        state.cart[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    clearCart: (state, action) => {
      state.cart = [];
      toast.error(`Đã xóa tất cả trong giỏ hàng`, {
        position: "top-right",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    deleteAllCartWhilePaymentSuccess: (state, action) => {
      state.cart = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity, price_discount } = cartItem;
          const itemTotal = price_discount
            ? price_discount * cartQuantity
            : price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});
