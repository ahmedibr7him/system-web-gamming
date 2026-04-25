import {  useParams } from "react-router-dom"
import ProductSwiper from "../../Home/FeauterProduct/ProductSwiper";
import { useSelector,useDispatch } from "react-redux";
import {  useEffect, useMemo,useRef } from "react";
import { GetCollection } from "../../../Dashbourd/Redux/AddCollectionSlice";
import DataProductId from "./DataProductId";
import { useSwiperNavigation } from "../../Home/FeauterProduct/useSwiperNavigation";
import NavButton from "../../Home/FeauterProduct/NavButton";
import { useTranslation } from "react-i18next";
const ProductID = () => {
  const {id} =useParams();
  const {t}=useTranslation()
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.addCollection.collection);
  const loading = useSelector((state) => state.addCollection.loading);
  
   const suggestedProducts = useMemo(() => {
    if (!collection) return [];
    return collection
      .filter((item) => (item.boy || item.girl || item.child) && item.id.toString() !== id)
      .slice(0, 10);
  }, [collection, id]);
      const latestSwiperRef = useRef(null);
       const { handleNext, handlePrev } = useSwiperNavigation({ swiperRef: latestSwiperRef }); 

useEffect(() => {
    if (!collection?.length) {
      dispatch(GetCollection());
    }
  }, [dispatch, collection?.length]);
  return (
    <> 
   <div className="bg-bg min-h-screen py-20 " >

    {/* RIGHT - Details */}
    <DataProductId collection={collection} id={id} loading={loading}/>

  {/* DESCRIPTION */}

  {/*  */}
               <div className='flex justify-between items-centermt-15 w-[90%] m-auto'>
            <p className='lg:text-3xl text-primary font-bold xs:text-xl'>{t("Lastest Collection")}</p>
            <div className='flex gap-8  items-center'>
               <NavButton direction="left" onClick={handlePrev} icon="fa-arrow-left" />
              <NavButton direction="right" onClick={handleNext} icon="fa-arrow-right" />
            </div>
        </div>
      <div className="w-[90%] m-auto overflow-hidden" >
        <ProductSwiper products={suggestedProducts} swiperRef={latestSwiperRef}/>
      </div>
</div>
</>
  )
  
}

export default ProductID