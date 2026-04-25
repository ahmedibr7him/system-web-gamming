
import { useTranslation } from 'react-i18next'

const OrderItems = ({selected}) => {
    const {t,i18n}=useTranslation()
    const isArabic =i18n.language ==="ar";
  return (
    <>
    <div className="space-y-4 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar ">
                      {selected.products.map((p, i) => (
                        <div key={i} className="flex justify-between items-center p-3 w-full xs:w-80 md-w-full rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-primary/10 transition-all group ">
                          <div className="flex items-center gap-4">
                            {/* Image from Collection */}
                            <div className="w-16 h-16 rounded-xl bg-white overflow-hidden border border-gray-100 shrink-0">
                              {p.image ? (
                                <img src={p.image} alt={p.name_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <i className="fa-solid fa-image text-xl"></i>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-black text-primary text-sm line-clamp-1">{isArabic?p.name_ar:p.name_en}</p>
                              <p className="text-[10px] text-secondary font-bold mb-1">SKU: {p.product_id?.split('-')[0]}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-lg font-bold">Qty: {p.quantity}</span>
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full border shadow-sm" style={{ backgroundColor: p.color }}></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right pr-2">
                            <p className="text-[10px] font-black text-secondary uppercase">{t("Unit Item")}</p>
                            <p className="text-primary font-black">#{i+1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
    </>
  )
}

export default OrderItems
