import { useTranslation } from "react-i18next";
import Title from "../../component/Title";
import AboutTitleAndDescription from "../component/about/AboutTitleAndDescription";
import AboutTitleAndNumber from "../component/about/AboutTitleAndNumber";

const About = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className={`max-w-7xl mx-auto pb-20 px-4 ${isArabic ? "font-cairo" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      
    
      <Title 
        title={t("About Us Management")} 
        subTitle={t("Update your company profile, statistics, and 'Why Choose Us' section")} 
      />

    
      <div className="mt-12 space-y-12">
        
        
        <div className="flex items-center gap-4 px-4">
          <div className="w-1 h-8 bg-primary rounded-full"></div>
          <h2 className="text-secondary text-[18px] font-bold">
            {t("Business Identity Data")}
          </h2>
        </div>

 =
        <div className="bg-white rounded-4xl shadow-xl shadow-gray-100/50 border border-gray-50 p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl text-primary">
              <i className="fa-solid fa-chart-line"></i>
           </div>
           <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-8 flex items-center gap-2">
              <i className="fa-solid fa-hashtag text-[10px]"></i>
              {t("Statistics & Highlights")}
           </h3>
           <AboutTitleAndNumber />
        </div>

       
        <div className="bg-white rounded-4xl shadow-xl shadow-gray-100/50 border border-gray-50 p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl text-primary">
              <i className="fa-solid fa-quote-right"></i>
           </div>
           <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-8 flex items-center gap-2">
              <i className="fa-solid fa-file-lines text-[10px]"></i>
              {t("Content & Descriptions")}
           </h3>
           <AboutTitleAndDescription />
        </div>

      </div>

      
      <div className="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
        <i className="fa-solid fa-circle-exclamation text-amber-500 text-xl"></i>
        <p className="text-xs font-medium text-amber-700 leading-relaxed">
          {t("Note: Changes made here will reflect immediately on the main landing page of your website. Please ensure the data accuracy.")}
        </p>
      </div>

    </div>
  );
};

export default About;