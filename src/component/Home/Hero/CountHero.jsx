import { useTranslation } from "react-i18next";
 import { motion } from "framer-motion"
  import  {HeroVariants}  from "../../Animation";
  import { assesst } from "../../../../public/assesst"
const CountHero = () => {
    const { t } = useTranslation();
  return (
    <>
     <div className="flex lg:flex-row xs:flex-col lg:justify-evenly items-center md:justify-center min-h-screen w-350  text-center relative xs:pt-20 lg:pt-0 ">
              {/* games */}
              <div className=" lg:h-screen flex w-full lg:pt-15 xs:justify-center  lg:justify-start items-start ">
                <h1
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.2)" }} className="xs:text-[80px] md:text-[120px] lg:text-[200px] xl:text-[200px] font-extrabold text-primary ">{t("GAME")}</h1>
              </div>
              {/* image */}
               <motion.img
                {...HeroVariants.image}
               loading="eager" fetchPriority="high"  sizes="(max-width: 768px) 100vw, 440px"  fetchPriority="high" decoding="async" src={assesst.hero2} alt="" className="xs:hidden lg:block absolute bottom-0" width={440} height={440} />
               {/* vault */}
              <div className="flex items-end lg:min-h-150  z-1 ">
                <h2
                className="text-[190px] text-transparent font-black xs:text-[70px] md:text-[120px] lg:text-[160px]" style={{ WebkitTextStroke: "2px #AAAAAA" }}>{t("VAULT")}</h2>
              </div>
            </div>
             <div
        className="sm:hidden absolute w-fit  flex flex-col items-start justify-center  xs:hidden xl:block lg:top-1/3 lg:right-10  z-10">
            <h1 className="text-xl font-bold text-center bg-primary text-text px-2 py-1 rounded-2xl z-10 relative shadow-md w-fit">{t("WELCOME_TO_GAME_VAULT")}</h1>
            <p className="text-center text-[14px] text-lg mt-4 text-secondary z-10 relative">{t("DISCOVER_THE_ULTIMATE_DESTINATION_FOR_GAMERS")}</p>
        </div>
        </>
  )
}

export default CountHero
