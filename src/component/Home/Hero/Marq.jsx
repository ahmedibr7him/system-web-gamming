import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";
const Marq = () => {
    const { t ,i18n } = useTranslation();
  return (
     <div dir={i18n.language === "ar" ? "Ltr":"Ltr" }  className="absolute w-full sm:h-12 bg-primary text-text font-bold text-lg cursor-pointer bottom-0">
         <Marquee className="absolute w-full sm:h-12 bg-primary text-text font-bold text-lg cursor-pointer xs:h-8 xs:font-semibold" gradient={false} speed={45} loop={0} pauseOnHover autoFill>
        <span aria-hidden="true" className="mx-10">{t("FREE_SHIPPING_ON_ALL_ORDERS")}</span>
          <span aria-hidden="true" className="mx-10">{t("FREE_SHIPPING_ON_ALL_ORDERS")}</span>
            <span aria-hidden="true" className="mx-10">{t("FREE_SHIPPING_ON_ALL_ORDERS")}</span>
            <span aria-hidden="true" className="mx-10">{t("FREE_SHIPPING_ON_ALL_ORDERS")}</span>
    </Marquee>
    </div>
  )
}

export default Marq
