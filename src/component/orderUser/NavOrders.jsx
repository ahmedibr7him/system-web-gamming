import React from 'react'
import { useTranslation } from 'react-i18next'

const NavOrders = ({order}) => {
    const {t}=useTranslation();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-4xl shadow-sm border border-blue-50 flex items-center gap-5">
             <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                <i className="fa-solid fa-box-archive"></i>
             </div>
             <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t("Orders")}</p>
                <h4 className="text-2xl font-black text-gray-800">{order.length}</h4>
             </div>
          </div>

          <div className="bg-white p-6 rounded-4xlshadow-sm border border-green-50 flex items-center gap-5">
             <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                <i className="fa-solid fa-dollar-sign"></i>
             </div>
             <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t("Total")}</p>
                <h4 className="text-2xl font-black text-gray-800">
                   ${order.reduce((acc, curr) => acc + (Number(curr.total_price) || 0), 0)}
                </h4>
             </div>
          </div>

          <div className="bg-white p-6 rounded-4xl shadow-sm border border-yellow-50 flex items-center gap-5">
             <div className="w-14 h-14 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                <i className="fa-solid fa-spinner"></i>
             </div>
             <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t("Under implementation")}</p>
                <h4 className="text-2xl font-black text-gray-800">
                   {order.filter(o => o.status === 'pending').length}
                </h4>
             </div>
          </div>
        </div>
    </>
  )
}

export default NavOrders
