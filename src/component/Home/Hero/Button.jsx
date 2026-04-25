import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
 import { motion } from "framer-motion"
 import  {HeroVariants}  from "../../Animation";
const Button = () => {
    const { t ,i18n } = useTranslation();
    const navigate =useNavigate();
  return (
 <motion.button 
  {...HeroVariants.fadeUp}
  aria-label={t("Order New")}
  onClick={() => navigate(`/product/${i18n.language}`)} 
  className="group absolute xl:ml-25 xl:bottom-30 xl:left-30 cursor-pointer shadow-2xl rounded-2xl xl:h-10 xl:w-60 overflow-hidden border border-secondary bg-text text-primary transition-all 
             sm:bottom-40 xs:bottom-20 xs:left-1/2 xs:-translate-x-1/2 xs:h-15 xs:w-75
             before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-primary before:duration-500 
             after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-primary after:duration-500 
             hover:text-white hover:before:h-full hover:after:h-full"
>
  <span aria-hidden="true" className="absolute top-0 left-1/4 h-0 w-1/4 bg-primary duration-500 group-hover:h-full"></span>
  <span aria-hidden="true" className="absolute bottom-0 right-1/4 h-0 w-1/4 bg-primary duration-500 group-hover:h-full"></span>

  <span className="relative z-10 font-bold flex h-full w-full items-center justify-center gap-4 sm:text-xl xl:text-[18px]">
    {t("Order New")}
    <i className={`fa-solid fa-arrow-right text-2xl transition-transform duration-300 ${i18n.language === "ar" ? "rotate-180" : ""}`}></i>
  </span>
</motion.button>
  )
}

export default Button
