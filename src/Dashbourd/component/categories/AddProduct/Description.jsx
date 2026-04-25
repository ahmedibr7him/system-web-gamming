
import { useTranslation } from 'react-i18next'

const Description = ({descriptionInputEn,descriptionInputAr}) => {
  const{t} =useTranslation()
  return (
    <>
    <div className="col-span-full flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Description (English)")}</label>
          <textarea ref={descriptionInputEn} rows="4"  placeholder={t('Enter the Message')} className="w-full p-4 outline-none text-secondary  shadow-lg bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all resize-none"></textarea>
        </div>

        <div className="col-span-full flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Description (Arabic)")}</label>
          <textarea ref={descriptionInputAr} placeholder='ادخل المحتوي...' rows="4" className="w-full p-4 outline-none text-secondary   shadow-lg bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all resize-none text-right"></textarea>
        </div>
    </>
  )
}

export default Description
