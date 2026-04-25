import { useTranslation } from 'react-i18next'

const PriceQuantityRelease = ({priceInput,numberInput,Release}) => {
  const {t}=useTranslation()
  return (
    <>
    <div className="flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Price ($)")}</label>
          <input type="number" ref={priceInput} required min="0" className="w-full p-3 outline-none text-secondary  shadow-lg bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Quantity")}</label>
          <input type="number" ref={numberInput} required min="0" className="w-full p-3 outline-none text-secondary  shadow-lg bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Release Year")}</label>
          <input type="number" ref={Release} required  className="w-full p-3 outline-none text-secondary  shadow-lg bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all" />
        </div>
    </>
  )
}

export default PriceQuantityRelease
