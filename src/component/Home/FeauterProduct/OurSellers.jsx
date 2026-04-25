import { useSelector } from "react-redux";
import ProductSwiper from "./ProductSwiper.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeroVariants } from '../../Animation.jsx';
import { useMemo, useRef } from 'react';
import { useSwiperNavigation } from "./useSwiperNavigation.jsx";
 import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next';
import NavButton from "./NavButton.jsx";
const OurSellers = () => {
  
  const {t} =useTranslation()
  const sellersSwiperRef = useRef(null);
 
   const {collection} =useSelector(state=>state.addCollection);

  const products= useMemo(()=>collection?.filter((item)=>item.our_best_seller)?.slice(0,5)||[],[collection]);
  const { handleNext, handlePrev } = useSwiperNavigation({ swiperRef: sellersSwiperRef });
  if (!products.length) return null

  return (
    
    <>
     <motion.div {...HeroVariants.image}
        className='flex justify-between items-center w-[90%] m-auto mt-15'>
            <p className='lg:text-3xl text-primary font-bold xs:text-xl'>{t("Our Best Seles")}</p>
            <div className='flex gap-8  items-center'>
                <NavButton direction="left" onClick={handlePrev} icon="fa-arrow-left" />
              <NavButton direction="right" onClick={handleNext} icon="fa-arrow-right" />
            </div>
        </motion.div>
      <div className="w-[98%] m-auto overflow-hidden">
        <ProductSwiper swiperRef={sellersSwiperRef} products={products}/>
      </div>
    </>
  );
}

export default OurSellers
