import { useTranslation } from "react-i18next"


const InputName = ({nameInpeEn,nameInpeAr}) => {
    const {t}=useTranslation()
  return (
   <>
   <div className="flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Name (English)")}</label>
          <input type="text" ref={nameInpeEn} required placeholder={t("Product Name")} className="w-full p-3 outline-none shadow-lg text-secondary bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Name (Arabic)")}</label>
          <input type="text" ref={nameInpeAr} required placeholder="اسم المنتج" className="w-full p-3 outline-none  shadow-lg text-secondary bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all text-right" />
        </div>
   </>
  )
}

export default InputName
