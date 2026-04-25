import { useDispatch } from 'react-redux';
import { selectProduct,DeleteCollection } from '../../../Redux/AddCollectionSlice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import supabase from '../../../../supabase/supabase';
import { showToast } from '../../../../Redux/toast/Toast';
const Buttons = ({filteredCollection,setOpenAdd ,item}) => {
  const dispatch=useDispatch();
  const {t}=useTranslation();

  // delete

    const deleteProduct = useCallback(async (id) => {
      const productToDelete = filteredCollection.find((item) => item.id === id);
      if (!productToDelete) return;
  
      const imageUrl = productToDelete.image;
      const path = imageUrl.split("/storage/v1/object/public/products/")[1];
  
      if (!productToDelete) return;
  
      try {
        if (path) {
          await supabase.storage.from("products").remove([decodeURIComponent(path)]);
        }
        await dispatch(DeleteCollection(id)).unwrap();
        dispatch(showToast({
          message:"Deleted successfully",
          type:"success"
        }))
      } catch (error) {
        dispatch(showToast({
          message:"A deletion error occurred",
          type:"success"
        }))
       return error.message
      }
    }, [filteredCollection, dispatch, t]);

    const select =useCallback(async(items)=>{
      await dispatch(selectProduct(items));
      setOpenAdd(true);
      window.scrollTo({ top: 800, behavior: "smooth" });
    },[dispatch,item,t])
  return (
    <>
    <div className='col-span-full border-t border-bg pt-4 mt-2 flex justify-end gap-4'>
                <button aria-label='selectProduct' onClick={() => select(item)} className='text-secondary hover:text-primary transition-colors'>
                  <i className="fa-regular fa-pen-to-square text-lg"></i>
                </button>
                <button aria-label='deleteProduct' onClick={() => deleteProduct(item.id)} className='text-red-400 hover:text-red-600 transition-colors'>
                  <i className="fa-regular fa-trash-can text-lg"></i>
                </button>
            </div>
    </>
  )
}

export default Buttons
