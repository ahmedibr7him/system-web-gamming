import { useTranslation } from "react-i18next";

const ImageSelect = ({item,setOpen,isOpen}) => {
     const { t, i18n } = useTranslation();
      const isArabic = i18n.language === "ar";
  return (
   <>
   <div className="flex items-center gap-4">
            <img 
              src={item.image} 
              loading="lazy" 
              alt={item.name_en} 
              className='w-12 h-12 object-contain p-1 shadow-sm rounded-full border border-primary shrink-0'
            />
            
            <h2 className='text-md md:text-lg font-bold text-primary truncate flex-1'>
              {isArabic ? item.name_ar : item.name_en}
            </h2>

            <button 
            aria-label='select'
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="p-2 hover:bg-bg rounded-full transition-colors"
            >
              <i className={`fa-solid fa-chevron-down transition-transform duration-300 text-secondary ${isOpen ? "rotate-180" : ""}`}></i>
            </button>
          </div>
   </>
  )
}

export default ImageSelect
