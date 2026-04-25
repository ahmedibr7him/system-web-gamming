import { useTranslation } from "react-i18next"
 import { motion } from "framer-motion"
   import { HeroVariants } from "../../Animation"  
   import { useSelector } from "react-redux"
const DetailsAboutNum = () => {
    const{i18n} =useTranslation()
     const isArabic = i18n.language === "ar"
          const {about} =useSelector((state)=>state.aboutTitleandNumber)||[];
     
    
  return (
    <>
    <motion.div {...HeroVariants.image}  className='w-full grid grid-cols-4 bg-white  rounded-3xl py-3 shadow-md'>
        {about?.map((item)=>{
          
            return(
                <div key={item.id} className='flex flex-col gap-1'>
                    <p className='font-bold xs:text-xl lg:text-3xl text-primary'>{item.number}+</p>
                    <p className='font-semibold text-xl xs:text-[14px] text-secondary'>{isArabic?item.title_ar:item.title_en}</p>
                </div>
            )
        })}
    </motion.div>
    </>
  )
}

export default DetailsAboutNum
