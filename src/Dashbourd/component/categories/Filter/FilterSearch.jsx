import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { filterBySearch } from "../../../Redux/AddCollectionSlice";

const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
      const { t } = useTranslation();
      const dispatch = useDispatch();

      useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(filterBySearch(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);
  return (
    <>
    <div className="relative w-full lg:w-72 flex items-center gap-1.5">
        <label htmlFor="TypeCategoriesSearch" className="text-secondary text-sm md:text-base font-bold whitespace-nowrap">{t("Search")}</label>
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 text-sm"></i>
        <input 
        id="TypeCategoriesSearch"
          type="text" 
          placeholder={t("search...")} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 outline-none text-secondary bg-white border border-bg shadow-sm rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
        />
      </div>
    </>
  )
}

export default FilterSearch
