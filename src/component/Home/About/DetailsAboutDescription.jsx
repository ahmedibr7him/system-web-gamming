import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
 import { motion } from "framer-motion"
  import { HeroVariants } from "../../Animation" 
const DetailsAboutDescription = () => {
    const {i18n}=useTranslation();
      const {aboutDescription} =useSelector(state=>state.titleAndDescriptionChoose)||[];
         const isArabic =i18n.language === "ar";
  return (
    <>
    <motion.div {...HeroVariants.image}
    className='grid grid-cols-1 lg:grid-cols-2 gap-2 justify-between items-stretch'>
        {aboutDescription?.map((item)=>{
            return(
                <div key={item.id} className='h-full bg-white p-4 rounded-2xl shadow-2xl flex flex-col'>
                    <p className='font-bold text-xl float-left text-primary'>{isArabic?item.title_ar:item.title_en}</p>
                    <p className='text-left text-secondary'>{isArabic?item.description_ar:item.description_en}</p>
                </div>
            )
        })}
    </motion.div>
    </>
  )
}

export default DetailsAboutDescription
