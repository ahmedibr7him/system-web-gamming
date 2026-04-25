
import TypeCategories from "./TypeCategories";
import FilterSearch from "./FilterSearch";

const Filter = () => {

  


  

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between w-full flex-wrap">
      
      
    <TypeCategories />

      {/* search */}
      <FilterSearch />

    </div>
  )
}

export default Filter;