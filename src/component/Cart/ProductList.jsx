import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../Dashbourd/Redux/orders/OrderLocalSlice";
import { removeCart } from "../../Dashbourd/Redux/orders/OrderLocalSlice";
const ProductList = ({enrichedProducts}) => {
    const {t ,i18n} =useTranslation()
    const dispatch =useDispatch()
    const isArabic =i18n.language ==="ar";
  return (
   <>
          <div className="space-y-4">
          {enrichedProducts.map((item) => (
            <div 
              key={`${item.id}-${item.color}`} 
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 md:px-8 shadow-sm rounded-4xl border border-gray-50 hover:shadow-md transition-all group"
            >
              {/* Product Info */}
              <div className="flex gap-6 items-center w-full md:w-auto">
                <div className="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                  <img src={item.image} alt={item.name_en} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-primary font-black text-lg md:text-[16px]">
                    {isArabic ? item.name_ar : item.name_en}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-secondary font-medium">{t("Color")}:</span>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200" 
                      style={{ backgroundColor: item.color || '#000' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quantity Controller */}
              <div className="flex items-center bg-bg rounded-2xl p-1 my-4 md:my-0">
                <button 
                aria-label="updateQuantity"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1), color: item.color }))}
                  className="w-10 h-10  flex items-center justify-center hover:bg-white rounded-xl transition shadow-sm active:scale-90"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="w-12 text-center font-bold text-primary">{item.quantity}</span>
                <button 
                 aria-label="updateQuantity"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1, color: item.color }))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition shadow-sm active:scale-90"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>

              {/* Price and Delete */}
              <div className="flex items-center md:justify-evenly justify-between w-full md:w-auto gap-10 border-t md:border-none pt-4 md:pt-0">
                <p className="text-xl md:text-[15px] mx-3 font-black text-primary">
                  {(item.price * item.quantity).toLocaleString()} $
                </p>
                <button 
                  className="w-10 h-10 rounded-full hover:bg-red-50 text-red-500 transition-colors flex items-center justify-center"
                  onClick={() => dispatch(removeCart(item.id))}
                >
                  <i className="fa-solid fa-trash-can text-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
   </>
  )
}

export default ProductList
