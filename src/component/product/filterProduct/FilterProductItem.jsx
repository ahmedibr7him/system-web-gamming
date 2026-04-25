import { HeroVariants } from "../../Animation";
 import { motion } from "framer-motion"

import TypProduct from "./TypProduct";
const FilterProductItem = () => {
  
  

  return (
    <>
       <motion.div {...HeroVariants.image} className="w-full py-5 m-auto grid lg:grid-cols-4 xs:grid-cols-1 md:grid-cols-2  gap-6 bg-white rounded-2xl shadow-md items-center px-5  ">
      <TypProduct/>
    </motion.div>
    </>
  )
}

export default FilterProductItem
