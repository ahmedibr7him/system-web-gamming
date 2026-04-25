import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addHowItWork, deleteHowItWork, editeHowItWork } from '../../Redux/HowItWork';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../../Redux/toast/Toast';

const HowitworkInput = () => {
  const [edite, setEdite] = useState(null);
  const [iconPreview, setIconPreview] = useState("fa-gear"); 

  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Refs
  const title_en = useRef(null);
  const title_ar = useRef(null);
  const icone = useRef(null);
  const description_en = useRef(null);
  const description_ar = useRef(null);

  const { data } = useSelector((state) => state.dataHowItWorks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clean = (value) => value.trim();

    const inputData = {
      title_en: clean(title_en.current.value),
      icone: clean(icone.current.value),
      title_ar: clean(title_ar.current.value),
      description_en: clean(description_en.current.value),
      description_ar: clean(description_ar.current.value),
    };

    if (!inputData.title_ar && !inputData.title_en) return;

    try {
      if (edite) {
        await dispatch(editeHowItWork({ id: edite.id, ...inputData }));
        setEdite(null);
        await dispatch(showToast({message:"تم التعديل بنجاح",type:"success"}))
      } else {
        await dispatch(addHowItWork(inputData));
        await dispatch(showToast({message:"تم الاضافه بنجاح",type:"success"}))
      }
      // Reset form properly
      e.target.reset();
      setIconPreview("fa-gear");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (edite) {
      title_ar.current.value = edite.title_ar || "";
      title_en.current.value = edite.title_en || "";
      description_ar.current.value = edite.description_ar || "";
      description_en.current.value = edite.description_en || "";
      icone.current.value = edite.icone || "";
      setIconPreview(edite.icone || "fa-gear");
      document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
    }
  }, [edite]);

  return (
    <div className="space-y-16 z-0">
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data?.map((item, index) => (
          <div 
            key={item.id} 
            className='group relative p-8 bg-white shadow-sm border border-gray-100 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10'
          >
           
            <span className="absolute top-6 left-8 text-5xl font-black text-gray-50 group-hover:text-primary/5 transition-colors">
              0{index + 1}
            </span>

            <div className='w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500'>
              <i className={`fa-solid ${item.icone} text-4xl text-primary group-hover:text-white`}></i>
            </div>

            <h3 className='text-xl font-black text-primary mb-4 tracking-tighter'>
              {isArabic ? item.title_ar : item.title_en}
            </h3>
            
            <p className='text-xs leading-relaxed text-secondary font-medium mb-8 opacity-80'>
              {isArabic ? item.description_ar : item.description_en}
            </p>

            <div className='flex gap-3 mt-auto border-t border-gray-50 pt-6 w-full justify-center'>
              <button 
              aria-label='edite'
                onClick={() => setEdite(item)}
                className='w-10 h-10 rounded-xl bg-gray-50 text-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm'
              >
                <i className="fa-regular fa-pen-to-square text-sm"></i>
              </button>
              <button
              aria-label='delete' 
                onClick={() => {  dispatch(deleteHowItWork(item.id));dispatch(showToast({message:"تم الحذف بنجاح",type:"error"})) }}
                className='w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm'
              >
                <i className="fa-regular fa-trash-can text-sm"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div id="form-section" className="bg-gray-50/50 p-5 rounded-[3rem] border border-gray-100 relative">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary text-xl">
            <i className={`fa-solid ${iconPreview} animate-bounce`}></i>
          </div>
          <div>
            <h3 className="text-sm font-black text-secondary uppercase tracking-widest">
              {edite ? t("Edit Process Step") : t("Create New Step")}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{t("Previewing Icon Above")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8'>
          
          
          <div className="md:col-span-2 space-y-2">
            <label className='text-[20px] font-black text-primary uppercase tracking-widest px-2'>{t("FontAwesome Icon Class")}</label>
            <input 
              type="text" 
              ref={icone} 
              required 
              onChange={(e) => setIconPreview(e.target.value || "fa-gear")}
              placeholder="e.g., fa-rocket" 
              className="w-full p-4 outline-none text-sm font-bold text-secondary bg-white shadow-sm rounded-2xl border border-transparent focus:border-primary/20 transition-all"
            />
          </div>

          {/* English Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className='text-[10px] font-black text-secondary uppercase tracking-widest px-2'>{t("Step Title (EN)")}</label>
              <input type="text" ref={title_en} required placeholder="e.g., Create Account" className="w-full p-4 outline-none text-sm font-bold bg-white shadow-sm rounded-2xl" />
            </div>
            <div className="space-y-2">
              <label className='text-[10px] font-black text-secondary uppercase tracking-widest px-2'>{t("Description (EN)")}</label>
              <textarea ref={description_en} required rows="3" className="w-full p-4 outline-none text-xs font-medium bg-white shadow-sm rounded-2xl resize-none" placeholder="Explain the step..." />
            </div>
          </div>

          {/* Arabic Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className='text-[15px] font-black text-secondary uppercase tracking-widest px-2 text-right block'>{t("عنوان الخطوة (عربي)")}</label>
              <input type="text" ref={title_ar} required placeholder="مثلاً: إنشاء حساب" className="w-full p-4 outline-none text-sm font-bold bg-white shadow-sm rounded-2xl text-right" />
            </div>
            <div className="space-y-2">
              <label className='text-[15px] font-black text-secondary uppercase tracking-widest px-2 text-right block'>{t("الوصف (عربي)")}</label>
              <textarea ref={description_ar} required rows="3" className="w-full p-4 outline-none text-xs font-medium bg-white shadow-sm rounded-2xl resize-none text-right" placeholder="اشرح الخطوة بالتفصيل..." />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
             {edite && (
               <button aria-label='edit' type="button" onClick={() => setEdite(null)} className="px-8 py-4 text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-all">
                 {t("Cancel Edit")}
               </button>
             )}
             <button aria-label='save' type="submit" className='px-12 py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all'>
               {edite ? t("Update Step") : t("Save Step")}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HowitworkInput;