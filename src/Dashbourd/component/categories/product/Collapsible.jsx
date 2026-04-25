
import { useTranslation } from 'react-i18next'

const Collapsible = ({item}) => {
    const {t}=useTranslation()
  return (
    <>
      <div className="space-y-2">
              <p className='text-sm font-semibold text-primary'>{t("Price : ")} <span className='text-secondary'>{item.price} $</span></p>
              <p className='text-sm font-semibold text-primary'>{t("Number : ")}<span className='text-secondary'>{item.number}</span></p>
              <p className='text-sm font-semibold text-primary'>{t("Release :")}<span className='text-secondary'>{item.release_year}</span></p>
            </div>
    </>
  )
}

export default Collapsible
