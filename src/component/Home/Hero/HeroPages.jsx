import { useTranslation } from "react-i18next";
import Marq from "./Marq";
import CountHero from "./CountHero";
import Button from "./Button";
const HeroPages = () => {
    const { i18n } = useTranslation();
  return (
    <>
    <div  className='w-full min-h-screen  relative py-20 overflow-hidden'dir={i18n.language === "ar" ? "Ltr":"Ltr" } >
        <div className=" flex flex-col  w-full items-center  min-h-screen absolute bottom-0 ">
          {/* count image and text */}
           <CountHero/>
        </div>
        {/* button order new */}
        <Button/>
        {/* Marq */}
   <Marq/>


   
    </div>
    </>
  )
}

export default HeroPages
