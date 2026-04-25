import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetCollection, DeleteCollection } from '../../../Redux/AddCollectionSlice'
import supabase from '../../../../supabase/supabase'
import { useTranslation } from 'react-i18next'
import Buttons from './Buttons'
import TypeClass from './TypeClass'
import ImageSelect from './ImageSelect'
import Collapsible from './Collapsible'
const Product = ({ setOpenAdd }) => {
  const [open, setOpen] = useState(null);
  const { filteredCollection, loading } = useSelector((state) => state.addCollection);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    dispatch(GetCollection());
  }, [dispatch]);

  const renderedProducts = useMemo(() => {
    return filteredCollection.map((item) => {
      const isOpen = open === item.id;

      return (
        <div 
          key={item.id} 
          className={`w-full transition-all duration-500 bg-white shadow-sm border border-bg p-4 rounded-3xl relative overflow-hidden flex flex-col
          ${isOpen ? "max-h-250" : "max-h-24"}`}
        >
         <ImageSelect item={item} setOpen={setOpen} isOpen={isOpen}/>
          

          {/* Collapsible Content */}
          <div className={`mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}>
          <Collapsible item={item}/>
            
            <TypeClass item={item}/>

            {/* Actions */}
            <Buttons filteredCollection={filteredCollection} setOpenAdd={setOpenAdd} item={item}/>
          </div>
        </div>
      )
    });
  }, [filteredCollection, open, isArabic, t , dispatch, setOpenAdd]);

  if (loading) return <div className="flex justify-center mt-20 "><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  
  if (filteredCollection.length === 0) {
    return <p className='text-center text-secondary font-bold mt-20'>{t("No Products Found")}</p>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-6 items-start'>
      {renderedProducts}
    </div>
  )
}

export default Product