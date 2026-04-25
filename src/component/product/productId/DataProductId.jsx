import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion'; 
import TiltImage from './TiltImage';
import { addToCart, getGuestId } from "../../../Dashbourd/Redux/orders/OrderLocalSlice"; 
import Description from './Description';
import ColorId from './ColorId';
import InputQuantityId from './InputQuantityId';
import TypeDataId from './TypeDataId';
import { showToast } from '../../../Redux/toast/Toast';

const DataProductId = ({ collection, id,loading }) => {
  const { t, i18n } = useTranslation();
  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
//   useState
    const [num, setNum] = useState(1);

  const isArabic = i18n.language === "ar";
//   data
  const data = useMemo(() => {
    return collection?.find((item) => item.id.toString() === id);
  }, [collection, id]);

  const plus = useCallback(() => setNum((prev) => prev + 1),[]);
  const mins = useCallback(() => setNum((prev) => (prev > 1 ? prev - 1 : 1)),[]);
  // color normal

 useEffect(() => {
    if (data?.color?.length) {
      setColor(data.color[0]);
    }
    setNum(1);
  }, [data, id]);
// add cart
  const handleAddToCart = useCallback(() => {
    if (!data) return;
    dispatch(addToCart({ 
        id: data.id, 
        quantity: num, 
        color, 
        guestId: getGuestId() 
    }));
    dispatch(showToast({
              message: "Added successfully", 
              type: "success"
            }));
    setNum(1);
  }, [dispatch, data, num, color]);
  
// loading
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <p className="text-2xl text-secondary font-bold">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <p className="text-2xl text-secondary font-bold">Not Found</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-[90%] m-auto grid lg:grid-cols-2 mt-7 gap-10 items-start text-left shrink-0">
        {/* Image Section */}
        <div className="flex flex-col gap-6">
          <div className="py-2 flex justify-center border border-gray-200 rounded-2xl shadow-md bg-white">
            <TiltImage src={data.image} />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-yellow-500 text-lg">
            <i className="fa-solid fa-star"></i>
            <span className="text-secondary font-semibold text-sm">
              (4.1 {t("Rating")})
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
            {isArabic ? data.name_ar : data.name_en}
          </h2>
          {/* Typ boy girl child store release */}
          <TypeDataId data={data}/>

          {/* Colors Selection */}
          <ColorId data={data} setNum={setNum} id={id} setColor={setColor} color={color}/>

          {/* Price & Cart Actions */}
          <div className="text-4xl font-black text-primary">

            ${(data.price * num).toLocaleString()}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/*InputQuantityId  */}
            <InputQuantityId setNum={setNum} num={num} mins={mins} plus={plus}/>

            <button aria-label='add to cart'  onClick={handleAddToCart}  className="flex-1 bg-primary text-white px-8 py-4 rounded-xl shadow-lg hover:brightness-110 hover:bg-secondary cursor-pointer active:scale-95 transition font-bold">
              {t("Add To Cart")}<i className="text-white mx-5 text-2xl fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <Description data={data}/>
    </>
  );
};

export default DataProductId;