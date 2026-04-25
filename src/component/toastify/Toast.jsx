// components/Toast.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../Redux/toast/Toast"
import { useTranslation } from "react-i18next";

const Toast = () => {
  const dispatch = useDispatch();
  const {t}=useTranslation()
  const { message, type, isVisible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const bgColors = {
    success: "bg-emerald-500",
    error: "bg-rose-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-25 left-1/2 -translate-x-1/2 z-9999 animate-bounce-in">
      <div className={`${bgColors[type]} text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-75`}>
        {type === "success" && <i className="fa-solid fa-circle-check text-xl"></i>}
        {type === "error" && <i className="fa-solid fa-circle-exclamation text-xl"></i>}
        
        <p className="font-bold text-sm">{t(message)}</p>

        <button 
          onClick={() => dispatch(hideToast())}
          className="ml-auto hover:scale-110 transition-transform"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default Toast;