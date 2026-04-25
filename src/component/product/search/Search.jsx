
import SearchPrice from "./SearchPrice";
import SearchText from "./SearchText";
const Search = () => {
  return (
    <section className="w-full m-auto  p-1" >
      <div className="flex flex-col md:flex-row md:justify-between gap-6 items-center">

        {/* Search Input */}
       <SearchText/>

        {/* Range + Price */}
       <SearchPrice/>

      </div>
    </section>
  );
};

export default Search;


