import { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { filterCategory } from '../../../Redux/AddCollectionSlice';
const TypeCategories = () => {
     const dispatch = useDispatch();

      const [typeFilter, setTypeFilter] = useState({
        TypeCategories: "All",
        TypeNewOld: "newest to Oldest"
      });
    const{t}=useTranslation()

    useEffect(() => {
        dispatch(filterCategory(typeFilter))
      }, [dispatch, typeFilter]);
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 flex-wrap">
       <label htmlFor="TypeCategories">
         <p className="text-secondary text-sm md:text-base font-bold whitespace-nowrap">
          {t("Select the Categories type :")}
        </p>
        
       </label>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {/* Select Category */}
          
          <select 
          id="TypeCategories"
            name="type categories" 
            onChange={(e) => setTypeFilter((prev) => ({ ...prev, TypeCategories: e.target.value }))} 
            className="flex-1 sm:w-60 p-2.5 outline-none text-secondary bg-white border border-bg shadow-sm rounded-xl focus:border-primary transition-all text-sm"
          >
            <option value="All">{t("All")}</option>
            <option value="Lastest Collection">{t("Lastest Collection")}</option>
            <option value="Our Best Sellers">{t("Our Best Sellers")}</option>
          </select>

          {/* Select Sort Order */}
         <div className="relative w-full lg:w-72 flex gap-3 items-center">
           <label htmlFor="TypeCategoriesFilter" className="text-secondary text-sm md:text-base font-bold whitespace-nowrap">{t("filter")}</label>
          <select 
          id="TypeCategoriesFilter"
            name="Type NewOld"  
            onChange={(e) => setTypeFilter((prev) => ({ ...prev, TypeNewOld: e.target.value }))} 
            className="flex-1 sm:w-44 p-2.5 outline-none text-secondary bg-white border border-bg shadow-sm rounded-xl focus:border-primary transition-all text-sm"
          >
            <option value="newest to Oldest">{t("newest to Oldest")}</option>
            <option value="Oldest to newes">{t("Oldest to newest")}</option>
          </select>
         </div>
        </div>
      </div>
    </>
  )
}

export default TypeCategories
