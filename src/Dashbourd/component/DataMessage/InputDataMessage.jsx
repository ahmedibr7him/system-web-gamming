import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addDataContact, editeDataContact } from "../../Redux/dataContactSlice";
import { useTranslation } from "react-i18next";
import { showToast } from "../../../Redux/toast/Toast";

const InputDataMessage = ({ edite, setEdite }) => {
  const [loading, setLoading] = useState(false);
  const icone = useRef(null);
  const title_en = useRef(null);
  const title_ar = useRef(null);
  const contact = useRef(null);
  
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handelSubmite = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const clean = (value) => value.trim();
    const formData = {
      icone: clean(icone.current.value),
      title_ar: clean(title_ar.current.value),
      title_en: clean(title_en.current.value),
      contact: clean(contact.current.value),
    };

   
    if (!formData.icone || !formData.title_en || !formData.title_ar || !formData.contact) {
      setLoading(false);
      return;
    }

    try {
      if (edite) {
        await dispatch(editeDataContact({ id: edite.id, ...formData })).unwrap();
        await dispatch(showToast({message:"Modified successfully",type:"success"}))
        setEdite(null);
      } else {
        await dispatch(addDataContact(formData)).unwrap();
        await dispatch(showToast({message:"Added successfully",type:"success"}))
      }

    
      e.target.reset(); 
    } catch (error) {
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (edite) {
      title_ar.current.value = edite.title_ar || "";
      title_en.current.value = edite.title_en || "";
      icone.current.value = edite.icone || "";
      contact.current.value = edite.contact || "";
      icone.current.focus();
    }
  }, [edite]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 mt-10">
      <form onSubmit={handelSubmite} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Icon Input */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="icone" className="font-bold text-primary text-sm px-1">
            {t("Icon (FontAwesome Class) :")}
          </label>
          <input
            type="text"
            ref={icone}
            id="icone"
            required
            placeholder="e.g. fa-solid fa-phone"
            className="w-full md:w-1/2 p-3 outline-none text-secondary bg-gray-50 border border-transparent focus:border-primary transition-all shadow-inner rounded-xl"
          />
        </div>

        {/* English Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="titleEn" className="font-bold text-primary text-sm px-1">
            {t("Title (English) :")}
          </label>
          <input
            type="text"
            ref={title_en}
            id="titleEn"
            required
            placeholder="e.g. Phone Number"
            className="w-full p-3 outline-none text-secondary bg-gray-50 border border-transparent focus:border-primary transition-all shadow-inner rounded-xl"
          />
        </div>

        {/* Arabic Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="titleAr" className="font-bold text-primary text-sm px-1">
            {t("Title (Arabic) :")}
          </label>
          <input
            type="text"
            id="titleAr"
            ref={title_ar}
            required
            placeholder="مثلاً: رقم الهاتف"
            className="w-full p-3 outline-none text-secondary bg-gray-50 border border-transparent focus:border-primary transition-all shadow-inner rounded-xl text-right"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="contact" className="font-bold text-primary text-sm px-1">
            {t("Contact Value :")}
          </label>
          <input
            type="text"
            id="contact"
            ref={contact}
            required
            placeholder="e.g. +20123456789 or email@info.com"
            className="w-full p-3 outline-none text-secondary bg-gray-50 border border-transparent focus:border-primary transition-all shadow-inner rounded-xl"
          />
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end items-center gap-4 mt-4">
          {edite && (
            <button
              type="button"
              onClick={() => {
                setEdite(null);
                icone.current.value = "";
              }}
              className="px-6 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all font-bold"
            >
              {t("Cancel")}
            </button>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`min-w-35 h-12 rounded-xl transition-all duration-300 font-bold shadow-lg flex items-center justify-center
              ${loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-primary text-white hover:scale-105 active:scale-95"}`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : edite ? (
              t("Update Information")
            ) : (
              t("Save Information")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputDataMessage;