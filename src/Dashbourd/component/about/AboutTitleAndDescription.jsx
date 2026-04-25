import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addTitleAndDescriptionChoose, editTitleAndDescriptionChoose, getTitleAndDescriptionChoose, deleteTitleAndDescriptionChoose } from '../../Redux/TitleAndDescriptionChoose';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../../Redux/toast/Toast';

const AboutTitleAndDescription = () => {
    const { i18n, t } = useTranslation();
    const isArabic = i18n.language === "ar";
    const dispatch = useDispatch();
    
    const titleInputRef_en = useRef(null);
    const titleInputRef_ar = useRef(null);
    const descriptionInputRef_en = useRef(null);
    const descriptionInputRef_ar = useRef(null);

    const { aboutDescription = [] } = useSelector(state => state.titleAndDescriptionChoose);
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clean = (value) => value.trim();
        const data = {
            title_en: clean(titleInputRef_en.current.value),
            title_ar: clean(titleInputRef_ar.current.value),
            description_en: clean(descriptionInputRef_en.current.value),
            description_ar: clean(descriptionInputRef_ar.current.value)
        };

        if (!data.title_ar && !data.title_en) return;

        try {
            if (editIndex !== null) {
                await dispatch(editTitleAndDescriptionChoose({ id: editIndex.id, ...data }));
                setEditIndex(null);
                  await dispatch(showToast({message:"تم التعديل بنجاح",type:"success"}))
            } else {
                await dispatch(addTitleAndDescriptionChoose(data));
                  await dispatch(showToast({message:"تم الاضافه بنجاح",type:"success"}))
            }
            e.target.reset();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        dispatch(getTitleAndDescriptionChoose());
    }, [dispatch]);

    useEffect(() => {
        if (editIndex !== null) {
            titleInputRef_en.current.value = editIndex.title_en || "";
            titleInputRef_ar.current.value = editIndex.title_ar || "";
            descriptionInputRef_en.current.value = editIndex.description_en || "";
            descriptionInputRef_ar.current.value = editIndex.description_ar || "";
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [editIndex]);

    return (
        <div className="space-y-12">
            <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {aboutDescription.length > 0 ? (
                    aboutDescription.slice(0, 4).map((item) => (
                        <div key={item.id} className="group relative bg-white border border-gray-100 rounded-4xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="mb-4">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/5 text-primary text-sm font-bold">
                                    0{aboutDescription.indexOf(item) + 1}
                                </span>
                            </div>
                            <h2 className="text-lg font-black text-primary mb-3 line-clamp-1 italic uppercase tracking-tighter">
                                {isArabic ? item.title_ar : item.title_en}
                            </h2>
                            <p className="text-xs leading-relaxed text-secondary font-medium h-20 overflow-y-auto custom-scrollbar">
                                {isArabic ? item.description_ar : item.description_en}
                            </p>
                            
                            <div className="mt-6 flex justify-end gap-2 border-t border-gray-50 pt-4">
                                <button 
                                    onClick={() => setEditIndex(item)} 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 text-secondary hover:bg-primary hover:text-white transition-all"
                                >
                                    <i className="fa-regular fa-pen-to-square text-xs"></i>
                                </button>
                                <button 
                                    onClick={() => {
                                         dispatch(deleteTitleAndDescriptionChoose(item.id));
                                         dispatch(showToast({message:"تم الحذف بنجاح",type:"error"}))
                                    }} 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <i className="fa-regular fa-trash-can text-xs"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
                        <p className='text-gray-400 font-bold uppercase tracking-widest text-xs'>{t("No Features Added Yet")}</p>
                    </div>
                )}
            </div>


            <form onSubmit={handleSubmit} className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <h3 className="text-sm font-black text-secondary uppercase tracking-widest">
                        {editIndex ? t("Modify Feature") : t("Add New Feature")}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Titles */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-primary/50 uppercase tracking-widest px-1">{t("Title (English)")}</label>
                            <input 
                                type="text" 
                                required 
                                ref={titleInputRef_en} 
                                className="w-full p-4 bg-white rounded-2xl shadow-sm outline-none border border-transparent focus:border-primary/20 transition-all font-bold text-sm"
                                placeholder="e.g. Innovation"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-primary/50 uppercase tracking-widest px-1">{t("العنوان (بالعربية)")}</label>
                            <input 
                                type="text" 
                                required 
                                ref={titleInputRef_ar} 
                                className="w-full p-4 bg-white rounded-2xl shadow-sm outline-none border border-transparent focus:border-primary/20 transition-all font-bold text-sm text-right"
                                placeholder="مثلاً: الابتكار"
                            />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-primary/50 uppercase tracking-widest px-1">{t("Description (English)")}</label>
                            <textarea 
                                required 
                                ref={descriptionInputRef_en} 
                                rows="3"
                                className="w-full p-4 bg-white rounded-2xl shadow-sm outline-none border border-transparent focus:border-primary/20 transition-all font-medium text-xs resize-none"
                                placeholder="Describe this feature..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-primary/50 uppercase tracking-widest px-1">{t("الوصف (بالعربية)")}</label>
                            <textarea 
                                required 
                                ref={descriptionInputRef_ar} 
                                rows="3"
                                className="w-full p-4 bg-white rounded-2xl shadow-sm outline-none border border-transparent focus:border-primary/20 transition-all font-medium text-xs text-right resize-none"
                                placeholder="اكتب وصفاً لهذه الميزة..."
                            />
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-10 flex justify-end gap-4">
                    {editIndex && (
                        <button 
                            type="button" 
                            onClick={() => setEditIndex(null)}
                            className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-all"
                        >
                            {t("Cancel")}
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="px-12 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        {editIndex ? t("Update Now") : t("Save Feature")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AboutTitleAndDescription;