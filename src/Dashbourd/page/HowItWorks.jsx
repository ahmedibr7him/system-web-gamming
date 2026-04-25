import Title from "../../component/Title";
import { useTranslation } from "react-i18next";
import HowitworkInput from "../component/HowItWork/howitworkInput";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHowItWork } from "../Redux/HowItWork";

const HowItWorks = () => {
  const { t, i18n } = useTranslation();
  const dispatch =useDispatch()
  const isArabic = i18n.language === "ar";
  useEffect(()=>{
    dispatch(getHowItWork())

  },dispatch)

  return (
    <div className={`max-w-7xl mx-auto z-0 pb-20 px-4  overflow-hidden  ${isArabic ? "font-cairo" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      
     
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
        <Title 
          title={t("Process Management")} 
          subTitle={t("Define the steps of how your service works for your customers")} 
        />
        
       
        <div className="hidden md:flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <i className="fa-solid fa-gears"></i>
          </div>
          <span className="text-[10px] font-black uppercase text-secondary tracking-widest leading-none">
            {t("Operational Steps")}
          </span>
        </div>
      </div>

     
      <div className="mt-12">
       
        <div className="flex items-center gap-4 mb-10 px-4">
          <div className="w-1 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
          <h2 className="text-secondary text-[18px] font-bold">
            {t("Configure Workflow Steps")}
          </h2>
        </div>

       
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 p-8 relative overflow-hidden">
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <HowitworkInput />
          </div>
        </div>
      </div>

      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
           <i className="fa-solid fa-lightbulb text-amber-500"></i>
           <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
             {t("Use clear and short titles for each step")}
           </p>
        </div>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
           <i className="fa-solid fa-image text-blue-500"></i>
           <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
             {t("Icons should match the step description")}
           </p>
        </div>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
           <i className="fa-solid fa-language text-emerald-500"></i>
           <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
             {t("Ensure translations are consistent in both languages")}
           </p>
        </div>
      </div>

    </div>
  );
};

export default HowItWorks;