import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { filterBySearch } from "../../../Dashbourd/Redux/AddCollectionSlice";
import { useTranslation } from "react-i18next";

const SearchText = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(filterBySearch(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="relative w-full md:w-80">
      <label htmlFor="search" className="sr-only">{t("Search")}</label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder={t("Search Products...")}
        className="w-full h-10 bg-white text-secondary shadow-sm outline-none px-4 pr-10 rounded-full border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
      <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/70"></i>
    </div>
  );
};

export default SearchText;