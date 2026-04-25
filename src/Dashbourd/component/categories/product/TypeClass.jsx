
import { useTranslation } from 'react-i18next'

const TypeClass = ({item}) => {
    const {t}=useTranslation()
  return (
   <>
   <div className="space-y-2">
                 <p className='text-sm font-semibold text-primary'>{t("Type : ")}
                   <span className='text-secondary lowercase'>{[item.boy && "boy", item.girl && "girl", item.child && "child"].filter(Boolean).join(" / ")}</span>
                 </p>
                 <p className='text-sm font-semibold text-primary'>{t("Classification : ")}
                   <span className='text-secondary lowercase'>{[item.latest_collection && t("latest"), item.our_best_seller && t("best seller")].filter(Boolean).join(" / ")}</span>
                 </p>
               </div>
   </>
  )
}

export default TypeClass
