import ProductSwiper from "./ProductSwiper";
import "swiper/css";
import NavButton from "./NavButton";
 import { motion } from "framer-motion"
 import { HeroVariants } from "../../Animation";
import "swiper/css/navigation";
import "swiper/css/pagination";
 import { useSelector } from "react-redux";
import { useMemo,useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSwiperNavigation } from "./useSwiperNavigation";

const LastestCollection = () => {
  const {t}=useTranslation()
         const latestSwiperRef = useRef(null);
  const {collection} =useSelector(state=>state.addCollection);
 
  const products= useMemo(()=>collection?.filter((item)=>item.latest_collection)?.slice(0,5)||[],[collection]);
   const { handleNext, handlePrev } = useSwiperNavigation({ swiperRef: latestSwiperRef });
  if (!products.length) return null
  return (
    <>
    <motion.div {...HeroVariants.image} 
        className='flex justify-between items-centermt-15'>
            <p className='lg:text-3xl text-primary font-bold xs:text-xl mt-15'>{t("Lastest Collection")}</p>
            <div className='flex gap-8  items-center'>
              <NavButton direction="left" onClick={handlePrev} icon="fa-arrow-left" />
              <NavButton direction="right" onClick={handleNext} icon="fa-arrow-right" />
            </div>
        </motion.div>
    <div className="w-[98%] m-auto overflow-hidden">
      <ProductSwiper swiperRef={latestSwiperRef} products={products}/>
    </div>

    </>
  );
}
export default LastestCollection
