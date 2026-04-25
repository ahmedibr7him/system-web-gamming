import { useState, useCallback, useMemo } from "react";
import Title from "../../component/Title";
import { useTranslation } from "react-i18next";
import { lazy ,Suspense} from "react";
const Filter =lazy(()=>import("../component/categories/Filter/Filter"))
const AddProduct=lazy(()=>import("../component/categories/AddProduct/AddProduct"))
const Product =lazy(()=>import("../component/categories/product/Product"))
const Categories = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { t } = useTranslation();

  
  const handleToggleAdd = useCallback(() => {
    setOpenAdd((prev) => !prev);
  }, []);

  return (
  
    <section className="p-2 md:p-6 flex flex-col gap-6 min-h-screen max-w-400 mx-auto mb-10">
      
      {/* Title Section */}
      <div className="w-full">
        <Title title={t("Categories")} subTitle="" />
      </div>

      {/* Filter & Actions Section */}
      <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-bg">
         <Suspense fallback={<div>Loading Products...</div>}>
        <Filter />
        </Suspense>
      </div>

      {/* Product List Section */}
      <div className="w-full flex-1 overflow-x-auto">
     <Suspense fallback={<div>Loading Products...</div>}>
        <Product setOpenAdd={setOpenAdd} />
        </Suspense>
      </div>

      <div className="mt-auto py-4 border-t border-bg flex justify-end">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-bg hover:shadow-md transition-shadow">
          <span className="text-sm md:text-lg font-bold text-secondary">
            {t("Add Category")}
          </span>
          <button
            aria-label="addCategories"
            onClick={handleToggleAdd}
            className="group cursor-pointer transition-transform duration-200 active:scale-90"
          >
            <i className="fa-regular fa-square-plus text-primary text-2xl md:text-3xl group-hover:text-primary/80"></i>
          </button>
        </div>
      </div>

      {/* Add Product Component */}
      {openAdd && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
           <Suspense fallback={<div>Loading AddProduct...</div>}>
           <AddProduct setOpenAdd={setOpenAdd} />
           </Suspense>
        </div>
      )}
    </section>
  );
};

export default Categories;