import { motion } from 'framer-motion'; 
import { useTranslation } from 'react-i18next';
import { HeroVariants } from '../../Animation';

const Description = ({data}) => {
    const {t ,i18n}=useTranslation()
    const isArabic = i18n.language === "ar"
  return (
    <>
    <motion.div {...HeroVariants.fadeUp} className="w-[90%] m-auto mt-20 gap-5 flex flex-col mb-15">
        <h3 className="font-bold text-3xl text-primary">{t("About This Product")}</h3>
        <div className="relative">
          <p className="px-4 py-1 bg-primary text-white w-fit rounded-t-lg text-sm">
            {t("Description")}
          </p>
          <div className="p-6 w-full bg-white rounded-b-xl rounded-re-xl shadow-sm border border-gray-100">
            <p className="text-secondary leading-relaxed tracking-wide">
              {isArabic ? data.description_ar : data.description_en}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Description
