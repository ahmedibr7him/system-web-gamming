import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import supabase from "../../../supabase/supabase";
import { addfeedback, editfeedback } from "../../Redux/ReviewSlice";
import { useDispatch } from "react-redux";
import { showToast } from "../../../Redux/toast/Toast";

const InputFeedback = ({ edite, setEdite, onSuccess }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const [flags, setFlags] = useState({ active: true });
  const [loading, setLoading] = useState(false);

  // Refs
  const name_Ar = useRef(null);
  const name_En = useRef(null);
  const description_Ar = useRef(null);
  const description_En = useRef(null);
  const imageInput = useRef(null);
  const numberInput = useRef(null);

  
  const generateFileHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const clean = (value) => value.trim();

    try {
      const name_ar = clean(name_Ar.current.value);
      const name_en = clean(name_En.current.value);
      const description_en = clean(description_En.current.value);
      const description_ar = clean(description_Ar.current.value);
      const file = imageInput.current.files[0];
      const number = numberInput.current.value;

      let imageUrl = edite?.image;

      if (file) {
        const hash = await generateFileHash(file);
        const ext = file.name.split(".").pop() || "png";
        const fileName = `${hash}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("photo_feedback")
          .upload(fileName, file, { contentType: file.type, upsert: true });

        if (uploadError && !uploadError.message.includes("exists")) {
          throw uploadError;
        }

        const { data } = supabase.storage.from("photo_feedback").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const formData = {
        name_en, name_ar, description_ar, description_en,
        number, image: imageUrl, active: flags.active
      };

      if (!edite) {
        await dispatch(addfeedback(formData)).unwrap();
        await dispatch(showToast({"message":"Added successfully",type:"success"}))
      } else {
        await dispatch(editfeedback({ id: edite.id, ...formData })).unwrap();
        setEdite(null);
         await dispatch(showToast({"message": "Modified successfully",type:"success"}))
      }

      // Reset Form
      e.target.reset();
      setPreview(null);
      if (onSuccess) onSuccess(); 

    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (edite) {
      name_Ar.current.value = edite.name_ar || "";
      name_En.current.value = edite.name_en || "";
      description_En.current.value = edite.description_en || "";
      description_Ar.current.value = edite.description_ar || "";
      numberInput.current.value = edite.number || "";
      setFlags({ active: edite.active });
    }
  }, [edite]);

  return (
    <form onSubmit={handelSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Image Upload Section */}
        <div className="md:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/20 rounded-4xl bg-gray-50/50">
          <label className="cursor-pointer flex flex-col items-center gap-3">
            {(preview || edite?.image) ? (
              <img
                src={preview || edite?.image}
                alt="preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
              </div>
            )}
            <span className="text-xs font-black text-primary uppercase tracking-widest">{t("Change Photo")}</span>
            <input
              type="file"
              ref={imageInput}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Name Fields */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-secondary uppercase px-2">{t("Name (English) : ")}</label>
          <input ref={name_En} required className="p-4 outline-none text-sm font-bold text-primary bg-gray-50 rounded-2xl border border-transparent focus:border-primary/30 transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-secondary uppercase px-2">{t("Name (Arabic) :")}</label>
          <input ref={name_Ar} required className="p-4 outline-none text-sm font-bold text-primary bg-gray-50 rounded-2xl border border-transparent focus:border-primary/30 transition-all text-end" />
        </div>

        {/* Description Fields */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-secondary uppercase px-2">{t("Description (English)")}</label>
          <textarea ref={description_En} required rows="3" className="p-4 outline-none text-sm font-semibold text-primary bg-gray-50 rounded-2xl border border-transparent focus:border-primary/30 transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-secondary uppercase px-2">{t("Description (Arabic)")}</label>
          <textarea ref={description_Ar} required rows="3" className="p-4 outline-none text-sm font-semibold text-primary bg-gray-50 rounded-2xl border border-transparent focus:border-primary/30 transition-all text-end" />
        </div>

        {/* Rating and Switch */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-secondary uppercase px-2">{t("Rating (0-5)")}</label>
          <input ref={numberInput} type="number" min="0" max="5" required className="p-4 outline-none text-sm font-bold text-primary bg-gray-50 rounded-2xl" />
        </div>

        <div className="flex items-center gap-4 px-4">
          <label className="relative inline-block w-12 h-6 cursor-pointer">
            <input 
              type="checkbox" 
              checked={flags.active} 
              onChange={() => setFlags(p => ({ ...p, active: !p.active }))} 
              className="peer sr-only" 
            />
            <span className="absolute inset-0 bg-gray-200 rounded-full transition-all peer-checked:bg-primary"></span>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
          </label>
          <span className="text-xs font-black text-secondary uppercase">{t("Active Status")}</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-52 h-14 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:shadow-primary/20 active:scale-95"}`}
        >
          {loading ? t("Processing...") : (edite ? t("Update Review") : t("Save Review"))}
        </button>
      </div>
    </form>
  );
};

export default InputFeedback;