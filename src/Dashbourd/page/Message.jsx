import { useTranslation } from "react-i18next";
import Title from "../../component/Title";
import TableMessage from "../component/Message/TableMessage";
import SearchAndFilter from "../component/Message/SearchAndFilter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMessage } from "../Redux/MessageSlice";

const Message = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getMessage());
  })

  return (
    <div className={`max-w-7xl mx-auto pb-20 px-4 ${isArabic ? "font-cairo" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      
     
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Title 
          title={t("Customer Messages")} 
          subTitle={t("Manage inquiries and communications from your clients")} 
        />
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-50">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-[10px] font-black uppercase text-secondary tracking-widest px-2">
            {t("Live Channel")}
          </span>
        </div>
      </div>

     
      <div className="mt-10 bg-white p-6 rounded-4xl shadow-xl shadow-gray-100/50 border border-gray-50">
        <SearchAndFilter />
      </div>
      <div className="mt-12 mb-6 flex items-center justify-between px-4">
        <h2 className="text-secondary text-[18px] font-bold flex items-center gap-2">
          <i className="fa-solid fa-envelope-open-text text-primary/60"></i>
          {t("All customer messages")}
        </h2>
        
        <div className="flex items-center gap-4 text-[11px] font-black uppercase text-gray-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {t("Read")}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {t("Unread")}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-4xl shadow-xl shadow-gray-100/50 overflow-hidden border border-gray-50">
        <TableMessage />
      </div>
      <p className="mt-8 text-center text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">
        {t("End of messages list")}
      </p>
    </div>
  );
};

export default Message;