import { useMemo } from 'react'
import { useTranslation } from "react-i18next"
 import { motion } from "framer-motion"
 import { HeroVariants } from "../../Animation"
 import { assesst } from "../../../../public/assesst"
import { useDispatch } from "react-redux"
import { selectProductType } from "../../../Dashbourd/Redux/AddCollectionSlice"

import { useNavigate } from "react-router-dom"


const DataOurCollection = () => {
    const {i18n,t}=useTranslation() 

      const dispatch=useDispatch();
    const navigate=useNavigate();

    const handelNavigate =async(type)=>{
        await dispatch(selectProductType(type));
        navigate(`/product/${i18n.language}`);
        window.scrollTo({top:0 , behavior:"smooth"})
    }
    const data = useMemo(() => [
        { id: 1, img: assesst.imageBoy, title: "Boy's Collection", description: "Choose the perfect game for your boy.", type: "boy" },
        { id: 2, img: assesst.girl, title: "Girl's Collection", description: "Choose the perfect game for your girl.", type: "girl" },
        { id: 3, img: assesst.kids, title: "Kid's Collection", description: "Choose the perfect game for your Child.", type: "child" },
    ], [])

    const CheckData=useMemo(()=>(
        data.map((item)=>(
            <motion.div {...HeroVariants.fadeUp} className="bg-white rounded-xl shadow-xl p-4 transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl" key={item.id} >
                    <div className="flex items-center justify-evenly">
                        <div className="flex flex-col gap-5">
                            <p className="font-bold text-xl text-primary">{t(`${item.title}`)}</p>
                            <p className="text-secondary">{t(`${item.description}`)}</p>
                        </div>
                        <img src={item.img}  fetchPriority="high" loading="eager" alt={item.title} decoding="async"  className="object-contain h-20 w-20 overflow-hidden p-2 shadow-md  rounded-full border-2  border-primary"/>
                    </div>
                    <button aria-label="check now" type="button" onClick={()=>handelNavigate(item.type)} className="cursor-pointer rounded-2xl px-5 py-2 overflow-hidden group bg-primary relative hover:bg-linear-to-r shadow-md hover:from-primary hover:to-primary text-bg hover:ring-2 hover:ring-offset-2 mt-5 hover:ring-primary transition-all ease-out duration-300">
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-bg opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                     <span className="relative">{t(`Check Now`)}</span>
                        </button>
                </motion.div>
        ))
    ),[data, t, i18n.language])
  return (
  <>
  {CheckData}
  </>
  )
}

export default DataOurCollection
