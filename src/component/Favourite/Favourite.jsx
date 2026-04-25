import { useTranslation } from "react-i18next";
import ProductItem from "../product/productItem/ProductItem";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getfavorite } from "../../Redux/favorite/favorte";
import { getGuestId } from "../../Dashbourd/Redux/orders/OrderLocalSlice";
import { GetCollection } from "../../Dashbourd/Redux/AddCollectionSlice";


const Favourite = () => {
  const { t } = useTranslation();
  const dispatch =useDispatch()
  const { filteredCollection } = useSelector((state) => state.addCollection);
  const { favorites } = useSelector((state) => state.favoriteSlice);

  const dataFavorites = useMemo(() => {
    const favoriteIds = new Set(favorites.map((fav) => fav.product_id));
    return filteredCollection.filter((item) => favoriteIds.has(item.id));
  }, [filteredCollection, favorites]);


useEffect(() => {
  const guestId = getGuestId();

  dispatch(getfavorite(guestId)); 
  dispatch(GetCollection())
}, [dispatch]);
  return (
    <section className="bg-bg min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex justify-center items-center text-center py-8 bg-white rounded-3xl shadow-sm border border-gray-50">
          <Title 
            title={t("Favourite")} 
            subTitle={t("Save your favorite products for quick and easy access anytime.")} 
          />
        </div>

        {/* Content Section */}
        {dataFavorites.length > 0 ? (
          <ProductItem dataFavorites={dataFavorites} />
          
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="p-4 bg-red-50 rounded-full mb-4">
              <i className=" text-red-400 text-8xl fa-solid fa-heart" ></i>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">
              {t("Your wishlist is empty")}
            </h3>
            <p className="text-gray-500 max-w-xs text-center">
              {t("Explore our products and tap the heart icon to save what you love.")}
            </p>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Favourite;