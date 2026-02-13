import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Customer slices
import sellerSlice from "./Seller/sellerSlice";
import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
import sellerProductSlice from "./Seller/sellerProductSlice";
import ProductSlice from "./Customer/ProductSlice";
import CartSlice from "./Customer/CartSlice";
import AuthSlice from "./Customer/AuthSlice";
import UserSlice from "./Customer/UserSlice";
import OrderSlice from "./Customer/OrderSlice";
import sellerOrderSlice from "./Seller/sellerOrderSlice";
import payoutSlice from "./Seller/payoutSlice";
import transactionSlice from "./Seller/transactionSlice";
import CouponSlice from "./Customer/CouponSlice";
import AdminCouponSlice from "./Admin/AdminCouponSlice";
import ReviewSlice from "./Customer/ReviewSlice";
import WishlistSlice from "./Customer/WishlistSlice";
import AiChatBotSlice from "./Customer/AiChatBotSlice";
import revenueChartSlice from "./Seller/revenueChartSlice";
import CustomerSlice from "./Customer/Customer/CustomerSlice";
import DealSlice from "./Admin/DealSlice";
import AdminSlice from "./Admin/AdminSlice";

const rootReducer = combineReducers({
  // customer
  auth: AuthSlice,
  user,
  products: ProductSlice,
  cart,
  orders: OrderSlice,
  coupone,
  review: ReviewSlice,
  wishlist,
  aiChatBot: AiChatBotSlice,
  homePage,

  // seller
  sellers: sellerSlice,
  sellerAuth,
  sellerProduct: sellerProductSlice,
  sellerOrder,
  payouts: payoutSlice,
  transaction,
  revenueChart: revenueChartSlice,

  // admin
  adminCoupon: AdminCouponSlice,
  adminDeals,
  admin: AdminSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
