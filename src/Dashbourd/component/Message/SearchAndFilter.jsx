import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { filterSearch, filterSelect } from "../../Redux/MessageSlice";
import { useState, useEffect } from "react";

const SearchAndFilter = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();
  const [select, setSelect] = useState("ALL");

  useEffect(() => {
    dispatch(filterSelect(select));
  }, [dispatch, select]);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      
      <div className="relative w-full md:w-64 group">
        <div className={`absolute top-1/2 -translate-y-1/2 text-primary/40 transition-colors group-focus-within:text-primary ${isArabic ? 'right-4' : 'left-4'}`}>
          <i className="fa-solid fa-filter text-sm"></i>
        </div>
        <select
          name="Type NewOld"
          onChange={(e) => setSelect(e.target.value)}
          id="TypeNewOld"
          className={`w-full p-4 outline-none text-xs font-black uppercase tracking-widest text-secondary cursor-pointer bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white transition-all rounded-2xl shadow-sm appearance-none ${isArabic ? 'pr-10' : 'pl-10'}`}
        >
          <option value="ALL">{t("All Messages")}</option>
          <option value="read">{t("Read Messages")}</option>
          <option value="unread">{t("Unread Messages")}</option>
        </select>
        <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 ${isArabic ? 'left-4' : 'right-4'}`}>
          <i className="fa-solid fa-chevron-down text-[10px]"></i>
        </div>
      </div>

      <div className="relative w-full md:w-96 group">
        <div className={`absolute top-1/2 -translate-y-1/2 text-primary/40 transition-colors group-focus-within:text-primary ${isArabic ? 'right-4' : 'left-4'}`}>
          <i className="fa-solid fa-magnifying-glass text-sm"></i>
        </div>
        <input
          type="text"
          placeholder={t("Search by name, email or content...")}
          onChange={(e) => dispatch(filterSearch(e.target.value))}
          className={`w-full p-4 outline-none text-sm font-bold text-primary bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white transition-all rounded-2xl shadow-sm ${isArabic ? 'pr-10 text-right font-cairo' : 'pl-10 text-left'}`}
        />
      </div>
      {(select !== "ALL") && (
        <button 
          onClick={() => setSelect("ALL")}
          className="text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors tracking-tighter"
        >
          {t("Reset Filter")}
        </button>
      )}
    </div>
  );
};

export default SearchAndFilter;