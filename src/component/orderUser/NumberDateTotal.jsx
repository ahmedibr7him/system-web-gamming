import React from 'react'
import { useTranslation } from 'react-i18next'

const NumberDateTotal = ({item}) => {
    const {t}=useTranslation()
  return (
    <>
      <div className="flex-1 space-y-6">

                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 px-4 py-2 rounded-xl text-primary font-black text-sm">
                        ORD-{item.order_number}
                      </div>
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        item.status === 'completed' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <p className="text-gray-400 text-[11px] font-bold uppercase">{t("Date")}</p>
                        <p className="font-bold text-gray-700">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400 text-[11px] font-bold uppercase">{t("Total amount")}</p>
                        <p className="font-black text-blue-600 text-xl">${item.total_price}</p>
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default NumberDateTotal
