import { useTranslation } from "react-i18next"


const Buttons = ({setOpenAdd,selectedProduct}) => {
    const {t}=useTranslation()
  return (
   <>
   <div className="col-span-full flex gap-4 justify-end mt-4">
          <button 
            type="button" 
            onClick={() => setOpenAdd(false)}
            className="px-8 py-3 rounded-xl font-bold text-secondary bg-bg hover:bg-gray-200 transition-all"
          >
            {t("Cancel")}
          </button>
          <button 
            type="submit" 
            className="px-10 py-3 rounded-xl font-bold text-white bg-primary shadow-lg shadow-primary/30 hover:scale-105 transition-all"
          >
            {selectedProduct ? t("Update Product") : t("Save Product")}
          </button>
        </div>
   </>
  )
}

export default Buttons
