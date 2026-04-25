import { getGuestId } from "../../../Dashbourd/Redux/orders/OrderLocalSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMemo, useCallback } from "react";
import { addfavorite, deletefavorite } from "../../../Redux/favorite/favorte"; 
import { showToast } from "../../../Redux/toast/Toast";

const ProductFilterItems = ({ dataFavorites }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { user } = useSelector((state) => state.auth);
  const { filteredCollection } = useSelector(state => state.addCollection);
  const { favorites } = useSelector((state) => state.favoriteSlice);
  const productsToDisplay = useMemo(() => {
    const list = dataFavorites || filteredCollection || [];
    return list.filter(item => item.active);
  }, [dataFavorites, filteredCollection]);

  const handleNavigate = useCallback((id) => {
    navigate(`/product/${id}/${i18n.language}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate, i18n.language]);

 const toggleFavorite = useCallback((productId) => {
    const existing = favorites.find((f) => f.product_id === productId);

    if (existing) {
      dispatch(deletefavorite(existing.id));
      dispatch(showToast({
                    message: "Removed from favorites", 
                    type: "error"
                  }));
    } else {
      const currentGuestId = getGuestId(); 
      
      const favoriteData = {
        product_id: productId,
        favorite_id: currentGuestId, 
        user_id: user?.id || null   
      };
      dispatch(addfavorite(favoriteData));
      dispatch(showToast({
                    message: "Added to favorites", 
                    type: "success"
                  }));
    }
  }, [favorites, dispatch, user]);

  if (productsToDisplay.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <i className="fa-solid fa-heart-crack text-[10rem] text-secondary/20"></i>
        <p className="text-2xl text-secondary font-bold">{t("Not Found")}</p>
      </div>
    );
  }

  return (
    <>
      {productsToDisplay.map((item) => (
        <div 
          key={item.id} 
          onClick={() => handleNavigate(item.id)} 
          className="group bg-white rounded-2xl cursor-pointer shadow-md p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center flex flex-col items-center justify-between border border-transparent hover:border-primary/20"
        >
          <div className="relative flex justify-center items-center w-full bg-bg rounded-2xl shadow-inner h-52 mb-5 overflow-hidden">
            <img src={item.image} alt="product" className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-3 right-3 bg-secondary/80 backdrop-blur-md text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg">
              {item.price} $
            </div>
          </div>

          <div className="w-full mb-4 flex flex-col items-center">
            <h3 className="font-extrabold text-xl text-primary mb-2 transition-colors duration-300 group-hover:text-secondary">
              {isArabic ? item.name_ar : item.name_en}
            </h3>
            <p className="text-secondary font-medium text-[14px] line-clamp-2 leading-relaxed opacity-80">
              {isArabic ? item.description_ar : item.description_en}
            </p>
          </div>

          <div className="w-full flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
            <button 
              onClick={(e) => { e.stopPropagation(); handleNavigate(item.id); }}
              className="relative overflow-hidden rounded-xl px-6 py-2 bg-primary text-white font-bold hover:bg-secondary transition-all"
            >
              {t(`Order Now`)}
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }} 
              className="p-2 transition-transform duration-300 hover:scale-125"
            >
              {favorites.some((fav) => fav.product_id === item.id) ? (
                <i className="fa-solid fa-heart text-2xl text-primary drop-shadow-sm"></i>
              ) : (
                <i className="fa-regular fa-heart text-2xl text-primary opacity-60"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductFilterItems;