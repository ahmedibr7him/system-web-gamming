import { useTranslation } from "react-i18next"

const ToastReturn = ({undoReturn,timeLeft}) => {
    const {t}=useTranslation()
  return (
     <>
     <div className="fixed top-28 left-1/2 -translate-x-1/2 z-100 w-[95%] max-w-md bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/40">
              {timeLeft}
            </div>
            <div>
              <p className="text-sm font-bold">جاري تنفيذ طلب الإرجاع...</p>
              <p className="text-[10px] opacity-80">ستتغير حالة المنتجات إلى "Returned" بعد قليل</p>
            </div>
          </div>
          <button 
            onClick={undoReturn}
            className="bg-white text-red-600 px-5 py-2 rounded-xl font-black text-xs hover:scale-105 transition-transform shadow-lg"
          >
           {t("(UNDO) retreated")}
          </button>
        </div>
       </>
  )
}

export default ToastReturn
