import { useTranslation } from "react-i18next"
 import { motion } from "framer-motion"
const Title = ({title,subTitle}) => {
  const{t} = useTranslation();
  return (
    <>
      <motion.div
       initial={{ opacity: 0, y:100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: .6 }} 
      className="flex flex-col gap-5">
        <h1 className="text-primary lg:text-5xl xs:text-2xl max-w-full font-extrabold">{t(`${title}`)}</h1>
      <p className="text-secondary xs:text-[12px] lg:text-[16px]">{t(`${`${subTitle}`}`)}</p>
      </motion.div>
      </>
  )
}

export default Title
