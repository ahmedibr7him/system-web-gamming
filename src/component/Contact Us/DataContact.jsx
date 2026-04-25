import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const DataContact = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  
  const { data } = useSelector((state) => state.dataContact || { data: [] });

  if (!data || data.length === 0) {
    return <div className="text-white/50 text-sm animate-pulse">Loading contact info...</div>;
  }

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="group flex gap-5 items-center bg-white/10 hover:bg-white/20 rounded-2xl px-5 py-4 transition-all duration-300 border border-white/5 hover:border-white/20"
        >
         
          <div className="flex items-center justify-center min-w-12.5 h-12.5 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <i className={`fa-solid ${item.icone} text-2xl text-white`}></i>
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="font-bold text-white text-lg leading-tight">
              {isArabic ? item.title_ar : item.title_en}
            </h3>
            
           
            <p className="text-white/80 xs:text-[8px] sm:text-[10px] md:text-base font-medium select-all">
              {item.contact}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DataContact;