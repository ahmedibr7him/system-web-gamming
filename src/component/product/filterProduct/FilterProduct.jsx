import FilterProductItem from "../filterProduct/FilterProductItem";
import ProductItem from "../productItem/ProductItem";
import Search from "../search/Search";
const FilterProduct = () => {   
  return (
  <>
  <div className="w-[90%] m-auto flex flex-col gap-10 py-20 ">
    <FilterProductItem/>
  <Search/>
  <ProductItem  />
  </div>
  </>
  );
};

export default FilterProduct;
