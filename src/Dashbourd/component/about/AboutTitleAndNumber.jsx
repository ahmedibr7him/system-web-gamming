import { useEffect, useRef, useState } from "react";
import { addAbout, getAbout, editAbout } from "../../Redux/TitleAndNumberSLice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { showToast } from "../../../Redux/toast/Toast";

const AboutTitleAndNumber = () => {
  const [editMode, setEditMode] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();
  const { about } = useSelector((state) => state.aboutTitleandNumber);


  const refs = useRef([
    { title_en: null, title_ar: null, number: null },
    { title_en: null, title_ar: null, number: null },
    { title_en: null, title_ar: null, number: null },
    { title_en: null, title_ar: null, number: null },
  ]);

  const handeSubmite = async (e) => {
    e.preventDefault();
    const clean = (val) => val?.trim();

   
    const formData = refs.current.map((ref, index) => ({
      id: about[index]?.id,
      title_en: clean(ref.title_en.value),
      title_ar: clean(ref.title_ar.value),
      number: ref.number.value,
    }));

    try {
      if (editMode) {
        
        for (let item of formData) {
          if (item.title_en && item.title_ar) {
            await dispatch(editAbout(item)).unwrap();
            await dispatch(showToast({message:"تم التعديل بنجاح",type:"success"}))
          }
        }
      } else {
        await dispatch(addAbout(formData)).unwrap();
        await dispatch(showToast({message:"تم الاضافه بنجاح",type:"success"}))
      }
      
      setEditMode(false);
      e.target.reset(); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  
  useEffect(() => {
    if (about.length > 0 && editMode) {
      refs.current.forEach((ref, i) => {
        if (about[i]) {
          ref.title_en.value = about[i].title_en || "";
          ref.title_ar.value = about[i].title_ar || "";
          ref.number.value = about[i].number || "";
        }
      });
    }
  }, [about, editMode]);

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50/50 p-6 rounded-4xl border border-gray-100 gap-6">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {about?.slice(0, 4).map((item) => (
            <div key={item.id} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-primary/5">
              <h3 className="font-black xs:text-xl md:text-2xl text-primary">{item.number}+</h3>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-tighter">
                {isArabic ? item.title_ar : item.title_en}
              </p>
            </div>
          ))}
        </div>
        
        <button
          aria-label="edit"
          onClick={() => setEditMode(!editMode)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
            editMode ? "bg-red-500 text-white" : "bg-white text-secondary hover:text-primary"
          }`}
        >
          <i className={`fa-solid ${editMode ? "fa-xmark" : "fa-pen-to-square"} text-xl`}></i>
        </button>
      </div>

      
      {(editMode || about.length === 0) && (
        <form onSubmit={handeSubmite} className="animate-slideDown space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50/30 p-6 rounded-4xl border border-gray-100 space-y-4">
                <span className="text-[10px] font-black text-primary/30 uppercase italic">Stat #{i + 1}</span>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase px-2">{t("Title (EN)")}</label>
                  <input
                    ref={(el) => (refs.current[i].title_en = el)}
                    required
                    className="w-full p-3 text-xs font-bold bg-white rounded-xl shadow-sm outline-none focus:ring-1 ring-primary/20"
                    placeholder="e.g. Clients"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase px-2">{t("Title (AR)")}</label>
                  <input
                    ref={(el) => (refs.current[i].title_ar = el)}
                    required
                    className="w-full p-3 text-xs font-bold bg-white rounded-xl shadow-sm outline-none focus:ring-1 ring-primary/20 text-right"
                    placeholder="مثلاً: العملاء"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase px-2">{t("Number")}</label>
                  <input
                    type="number"
                    ref={(el) => (refs.current[i].number = el)}
                    required
                    className="w-full p-3 text-xs font-black bg-white rounded-xl shadow-sm outline-none focus:ring-1 ring-primary/20"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              {editMode ? t("Update Stats") : t("Save Stats")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AboutTitleAndNumber;