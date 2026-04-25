import { configureStore } from "@reduxjs/toolkit";
import addCollection from "../Dashbourd/Redux/AddCollectionSlice";
import authReducer  from "./Login/LoginSlice";
import CollectionSlice from "./collection/CollectionSlice";
import aboutTitleandNumber from "../Dashbourd/Redux/TitleAndNumberSLice";
import aboutTitleDescriptionChoose from "../Dashbourd/Redux/TitleAndDescriptionChoose";
import dataHowItWorks from "../Dashbourd/Redux/HowItWork";
import dataContact from "../Dashbourd/Redux/dataContactSlice";
import dataMessage from "../Dashbourd/Redux/MessageSlice"
import linkContact from "../Dashbourd/Redux/dataLinkContactSlice"
import reviewSlice from '../Dashbourd/Redux/ReviewSlice'
import users from '../Dashbourd/Redux/UsersSlic';
import favoriteSlice from "../Redux/favorite/favorte";
import order from "../Dashbourd/Redux/orders/OrderSlice"
import orderItem from "../Dashbourd/Redux/orders/OrderItemSlice"
import orderLocalSlice from "../Dashbourd/Redux/orders/OrderLocalSlice";
import cart from "../Dashbourd/Redux/orders/OrderLocalSlice"
import targets from "../Dashbourd/Redux/target/Target"
import toast from "../Redux/toast/Toast"
export const CountStore = configureStore({
  reducer: {
    addCollection:addCollection,
    addOrder:CollectionSlice,
    aboutTitleandNumber:aboutTitleandNumber,
    auth: authReducer ,
    titleAndDescriptionChoose:aboutTitleDescriptionChoose,
    dataHowItWorks:dataHowItWorks,
    dataContact:dataContact,
    dataMessage,
    linkContact,
    reviewSlice,
    users,
    favoriteSlice,
    order,
    orderItem,
    orderLocalSlice,
    cart,
    targets,
    toast,
  },
});