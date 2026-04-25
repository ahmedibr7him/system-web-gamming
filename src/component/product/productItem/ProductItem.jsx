import { useTranslation } from "react-i18next"
import ProductFilterItems from "./ProductFilterItems"
 import { motion } from "framer-motion"
 import { HeroVariants } from "../../Animation";
const ProductItem = ({dataFavorites}) => {

      const{t}=useTranslation()
  return (
  <section>
    <h3 className="font-bold text-5xl text-primary mb-8" >{t("All Product")}</h3>
       <motion.div {...HeroVariants.fadeUp} className="w-full m-auto grid lg:grid-cols-3 xs:grid-cols-1 md:grid-cols-2 gap-5">
        <ProductFilterItems dataFavorites={dataFavorites}/>
    </motion.div>
  </section>
  )
}

export default ProductItem
