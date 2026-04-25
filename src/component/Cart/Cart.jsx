import {  useDispatch, useSelector } from "react-redux";
import Title from "../Title";
import Confirm from "./Confirm";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import { GetCollection } from "../../Dashbourd/Redux/AddCollectionSlice";

const Cart = () => {
  const { t,i18n } = useTranslation();
  const navigate =useNavigate()
  const dispatch=useDispatch()
  
  const { cart } = useSelector((state) => state.cart);
  const { collection } = useSelector((state) => state.addCollection);

  const { enrichedProducts, totalPrice } = useMemo(() => {
    let total = 0;
    const enriched = cart.map((cartItem) => {
      const productDetails = collection.find((item) => item.id === cartItem.id);
      if (productDetails) {
        total += productDetails.price * cartItem.quantity;
      }
      return {
        ...productDetails,
        ...cartItem,
      };
    });
    return { enrichedProducts: enriched, totalPrice: total };
  }, [cart, collection]);


  if (cart.length === 0) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center gap-5 bg-bg">
        <i className="fa-solid fa-cart-shopping text-6xl text-gray-200"></i>
        <p className="text-xl font-bold text-secondary">{t("Your cart is empty")}</p>
        <button aria-label="Show Now" onClick={() => navigate(`/product/${i18n.language}`)} className="bg-primary text-white px-8 py-2 rounded-full shadow-md hover:scale-105 transition">
          {t("Shop Now")}
        </button>
      </section>
    );
  }

  useEffect(()=>{
    dispatch(GetCollection());
  },[dispatch])

  return (
    <section className="mb-20 bg-bg py-20 min-h-screen ">
      <div className="w-[90%] m-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-center  items-center py-8 text-center bg-white rounded-2xl shadow-sm mb-10">
          <Title title="Your Cart" subTitle="Ready for checkout?"/>
        </div>

        {/* Products List */}
        <ProductList enrichedProducts={enrichedProducts}/>

        {/* Footer / Summary */}
        <div className="mt-12 bg-white rounded-[2.5rem] p-8 shadow-sm flex flex-col lg:flex-row justify-between items-center border border-gray-50 gap-8">
  <div className="mb-6 md:mb-0 text-center md:text-left">
    <p className="text-secondary font-medium text-lg">{t("Total Price")}</p>
    <p className="lg:text-4xl xs:text-2xl font-black text-primary leading-none">
      {totalPrice.toLocaleString()} <span className="text-2xl">$</span>
    </p>
  </div>
  <div className="w-full md:max-w-md">
    <Confirm totalPrice={totalPrice} 
    totalItems={enrichedProducts.reduce((acc, item) => acc + item.quantity, 0)}/>
  </div>
</div>
      </div>
    </section>
  );
};

export default Cart;