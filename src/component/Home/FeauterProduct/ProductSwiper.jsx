import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, deletefavorite } from "../../../Redux/favorite/favorte";
import { useCallback, useMemo } from "react";
// 1. استيراد دالة جلب معرف الضيف
import { getGuestId } from "../../../Dashbourd/Redux/orders/OrderLocalSlice"; 
import { showToast } from "../../../Redux/toast/Toast";

const ProductSwiper = ({ swiperRef, products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  
  // 2. جلب حالة المفضلات والمستخدم
  const { favorites } = useSelector((state) => state.favoriteSlice) || [];
  const { user } = useSelector((state) => state.auth); 
  
  const isArabic = i18n.language === "ar";

  const activeProducts = useMemo(() => {
    return products?.filter((item) => item.active) || [];
  }, [products]);

  const handleFavoriteToggle = useCallback(async (e, productId) => {
    e.stopPropagation();
    
    const existing = favorites.find((f) => f.product_id === productId);

    if (existing) {
      await dispatch(deletefavorite(existing.id));
       dispatch(showToast({
                    message: "Removed from favorites", 
                    type: "error"
                  }));
    } else {
      const favoriteData = {
        product_id: productId,
        favorite_id: getGuestId(),
        user_id: user?.id || null  
      };
      
      await dispatch(addfavorite(favoriteData));
      dispatch(showToast({
                    message: "Added to favorites", 
                    type: "success"
                  }));
    }
  }, [dispatch, favorites, user]);

  const handleNavigate = useCallback((id) => {
    navigate(`/product/${id}/${i18n.language}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate, i18n.language]);

  return (
    <div className="w-full px-6 py-10">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination, Autoplay]}
        loop={products?.length > 3}
        slidesPerView={3}
        spaceBetween={24}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12 feature-swiper"
      >
        {activeProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => handleNavigate(item.id)}
              className="bg-white rounded-2xl cursor-pointer shadow-md p-6 hover:scale-105 hover:-rotate-1 hover:shadow-2xl text-center duration-500 transition flex flex-col items-center justify-between h-112.5" 
            >
              {/* Product Image */}
              <div className="flex justify-center items-center w-full bg-bg rounded-2xl shadow h-52 mb-5 overflow-hidden">
                <img
                  src={item.image}
                   fetchPriority="high"
                  loading="eager"
                  alt={item.name_en}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Title & Price */}
              <div className="w-full my-3 flex justify-between items-center gap-2">
                <p className="font-bold text-lg text-primary line-clamp-1 flex-1 text-right">
                  {isArabic ? item.name_ar : item.name_en}
                </p>
                <p className="px-3 py-1 rounded-xl bg-secondary text-bg font-semibold shrink-0">
                  {item.price} $
                </p>
              </div>

              {/* Description */}
              <div className="w-full mb-5">
                <p className={`${isArabic ? 'text-right' : 'text-left'} font-medium text-[14px] text-secondary line-clamp-2 min-h-10`}>
                  {isArabic ? item.description_ar : item.description_en}
                </p>
              </div>

              {/* Actions */}
              <div className="w-full flex justify-between items-center mt-auto">
                <button
                  aria-label="order new"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(item.id);
                  }}
                  className="cursor-pointer rounded-2xl px-5 py-2 overflow-hidden group bg-primary relative shadow-md text-bg font-bold transition-all"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">{t("Order Now")}</span>
                </button>

                <button
                  aria-label="favorite"
                  onClick={(e) => handleFavoriteToggle(e, item.id)}
                  className="transition-transform active:scale-125 p-2"
                >
                  {favorites.some((fav) => fav.product_id === item.id) ? (
                    <i className="fa-solid fa-heart text-2xl text-primary drop-shadow-sm"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-2xl text-primary opacity-70 hover:opacity-100"></i>
                  )}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;