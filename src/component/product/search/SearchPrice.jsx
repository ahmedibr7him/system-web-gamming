import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { filterByPrice } from "../../../Dashbourd/Redux/AddCollectionSlice";

const SearchPrice = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFirstRender = useRef(true); 

  const collection = useSelector(state => state.addCollection.collection, shallowEqual);

  const maxPrice = useMemo(() => {
    if (!collection?.length) return 1000;
    return Math.max(...collection.map(item => Number(item.price) || 0));
  }, [collection]);

  const [price, setPrice] = useState(maxPrice);

  useEffect(() => {
    if (maxPrice) setPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      dispatch(filterByPrice(Number(price) || 0));
    }, 400);

    return () => clearTimeout(timer);
  }, [price, dispatch]);

  const handlePriceChange = useCallback((e) => {
    const val = e.target.value;
    if (val === "") {
      setPrice("");
      return;
    }
    const numericVal = Number(val);
    if (!isNaN(numericVal) && numericVal >= 0 && numericVal <= maxPrice) {
      setPrice(numericVal);
    }
  }, [maxPrice]);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center w-full md:w-auto bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-2 w-full md:w-56">
        <div className="flex justify-between items-center">
          <label htmlFor="range" className="font-semibold text-primary text-sm uppercase tracking-wider">
            {t("Max Price")}
          </label>
          <span className="text-xs font-mono text-gray-400">${price || 0}</span>
        </div>
        <input
          type="range"
          id="range"
          min={0}
          max={maxPrice}
          step={1}
          value={Number(price) || 0}
          onChange={handlePriceChange}
          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary transition-all hover:accent-primary-dark"
        />
      </div>

      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
        <span className="text-gray-400 font-medium text-sm">$</span>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          placeholder="0"
          className="w-20 bg-transparent text-secondary font-bold text-sm outline-none"
        />
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <p className="text-[10px] text-gray-400 leading-tight uppercase font-bold">
          Limit <br /> ${maxPrice}
        </p>
      </div>
    </div>
  );
};

export default SearchPrice;