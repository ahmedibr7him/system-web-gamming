
import { useTranslation } from 'react-i18next'

const ButtonReturn = ({canReturn,requestReturn,returningId,item}) => {
    const{t}=useTranslation()
  return (
    <>
                        <div className="flex flex-col justify-center items-center lg:items-end gap-4 min-w-55">
                    {canReturn(item.created_at) ? (
                      <div className="w-full text-center group">
                        <button 
                         aria-label='Available'
                          onClick={() => requestReturn(item.id)}
                          disabled={returningId !== null}
                          className={`w-full py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm border 
                            ${returningId === item.id 
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                              : 'bg-gray-50 text-red-500 border-red-50 hover:bg-red-600 hover:text-white'}`}
                        >
                          <i className={`fa-solid fa-arrow-rotate-left transition-transform ${returningId !== item.id && 'group-hover:-rotate-180'}`}></i>
                          {returningId === item.id ? t("Return in progress...") : t("Return order")}
                        </button>
                        <p className="text-[10px] text-red-400 font-bold mt-2 animate-pulse">
                         {t("Available for 24 hours only")}
                        </p>
                      </div>
                    ) : (
                      <div className="w-full">
                         <button disabled aria-label='disabled' className="w-full py-4 bg-gray-50 text-gray-300 font-black rounded-2xl cursor-not-allowed flex items-center justify-center gap-3 border border-gray-100">
                          <i className="fa-solid fa-lock"></i>
                         {t("Your return has expired")}
                        </button>
                      </div>
                    )}
                  </div>
    </>
  )
}

export default ButtonReturn
