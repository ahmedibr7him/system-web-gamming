import { useTranslation } from "react-i18next";
import Title from "../../component/Title";
import { useState,useEffect } from "react";
import FeedbackComponent from "../component/Reviews/FeedbackComponent";
import InputFeedback from "../component/Reviews/InputFeedback";
import { useDispatch } from "react-redux";
import { getfeedback } from "../Redux/ReviewSlice";

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  
  const [edite, setEdite] = useState(null);
 
  const [showInput, setShowInput] = useState(false);
  const dispatch =useDispatch();
    useEffect(() => {
      dispatch(getfeedback());
    }, [dispatch]);

  
  const toggleInput = () => {
    setShowInput(!showInput);
    if (edite) setEdite(null); 
  };

  return (
    <div className={`max-w-7xl mx-auto pb-20 px-4 ${isArabic ? "font-cairo" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      
     
      <Title title={t("Reviews Management")} subTitle={t("View and manage customer feedbacks")} />

      
      <div className="mt-12 bg-white rounded-4xl shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <h2 className="text-secondary text-[18px] font-bold flex items-center gap-2">
            <i className="fa-solid fa-list-check text-primary"></i>
            {t("All Reviews")}
          </h2>
        </div>
        <div className="p-6">
          <FeedbackComponent setEdite={(data) => {
             setEdite(data);
             setShowInput(true); 
          }} />
        </div>
      </div>

      {/* Toggle Button) */} 
      <div className="mt-10 flex justify-end items-center gap-4 px-4">
        <h3 className="text-[18px] font-bold text-secondary">
          {edite ? t("Edit Review :") : t("Add Review :")}
        </h3>
        <button
          onClick={toggleInput}
          aria-label="Toggle Input"
          className={`cursor-pointer transition-all duration-300 transform hover:scale-110 ${showInput ? 'rotate-45 text-red-500' : 'text-primary'}`}
        >
          
          <i className={`fa-solid ${showInput ? 'fa-circle-xmark' : 'fa-square-plus'} text-[35px]`}></i>
        </button>
      </div>

      
      {showInput && (
        <div className="mt-6 animate-slideDown">
          <div className="bg-white rounded-4xl shadow-2xl shadow-primary/5 border border-primary/10 p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-primary/5 text-9xl pointer-events-none">
              <i className="fa-solid fa-pen-nib"></i>
            </div>
            
            <InputFeedback 
                setEdite={setEdite} 
                edite={edite} 
                onSuccess={() => setShowInput(false)} 
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Reviews;