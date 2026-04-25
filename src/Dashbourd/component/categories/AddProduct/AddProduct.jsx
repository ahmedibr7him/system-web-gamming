import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect, useCallback } from 'react';
import supabase from '../../../../supabase/supabase';
import { AddCollection, EditCollection, selectProduct } from '../../../Redux/AddCollectionSlice';
import { useTranslation } from 'react-i18next';
import ImageUpload from './ImageUpload';
import InputName from './InputName';
import PriceQuantityRelease from './PriceQuantityRelease';
import Description from './Description';
import Buttons from './Buttons';
import TogglesGroup from './TogglesGroup';
import { showToast } from '../../../../Redux/toast/Toast';

const AddProduct = ({ setOpenAdd }) => {
  const [flags, setFlags] = useState({
    active: true,
    boy: false,
    girl: false,
    child: false,
    latest_collection: false,
    our_best_seller: false,
  });

  const selectedProduct = useSelector((state) => state.addCollection.selectedProduct);
  const { collection } = useSelector(state => state.addCollection);
  const [preview, setPreview] = useState(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const latestCount = collection.filter(item => item.latest_collection).length;
  const ourBestSeller = collection.filter(item => item.our_best_seller).length;

  // Refs
  const nameInpeEn = useRef(null);
  const nameInpeAr = useRef(null);
  const priceInput = useRef(null);
  const numberInput = useRef(null);
  const colorInput = useRef(null);
  const imageInput = useRef(null);
  const Release = useRef(null);
  const descriptionInputEn = useRef(null);
  const descriptionInputAr = useRef(null);

  const generateFileHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name_en = nameInpeEn.current.value.trim();
      const name_ar = nameInpeAr.current.value.trim();
      const price = priceInput.current.value.trim();
      const number = numberInput.current.value.trim();
      const color = colorInput.current.value.split(",").map(c => c.trim());
      const file = imageInput.current.files[0];
      const release = Release.current.value.trim();
      const description_en = descriptionInputEn.current.value.trim();
      const description_ar = descriptionInputAr.current.value.trim();

      let imageUrl = selectedProduct?.image;

      if (file) {
        const hash = await generateFileHash(file);
        const ext = file.name.split(".").pop();
        const fileName = `${hash}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("products").upload(fileName, file, { upsert: false });

        if (uploadError && uploadError.message.includes("exists")) {
          const { data } = supabase.storage.from("products").getPublicUrl(fileName);
          imageUrl = data.publicUrl;
        } else if (uploadError) {
          throw uploadError;
        } else {
          if (selectedProduct?.image) {
            const oldPath = decodeURIComponent(selectedProduct.image.split("/storage/v1/object/public/products/")[1]);
            await supabase.storage.from("products").remove([oldPath]);
          }
          const { data } = supabase.storage.from("products").getPublicUrl(fileName);
          imageUrl = data.publicUrl;
        }
      }

      const formData = {
        name_en, name_ar, price: Number(price), number: Number(number),
        color, image: imageUrl, release_year: Number(release),
        description_en, description_ar, ...flags
      };

      if (selectedProduct) {
        await dispatch(EditCollection({ id: selectedProduct.id, ...formData })).unwrap();
        dispatch(selectProduct(null));
        dispatch(showToast({
          message:"Modified successfully",
          type:"success"
        }))
      } else {
        await dispatch(AddCollection(formData)).unwrap();
        dispatch(showToast({
          message:"Added successfully",
          type:"success"
        }))
      }

      setOpenAdd(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (selectedProduct?.id) {
      nameInpeEn.current.value = selectedProduct.name_en;
      nameInpeAr.current.value = selectedProduct.name_ar;
      priceInput.current.value = selectedProduct.price;
      numberInput.current.value = selectedProduct.number;
      colorInput.current.value = selectedProduct.color?.join(", ") || "";
      Release.current.value = selectedProduct.release_year;
      descriptionInputEn.current.value = selectedProduct.description_en;
      descriptionInputAr.current.value = selectedProduct.description_ar;
      setPreview(selectedProduct.image);
      setFlags({
        active: selectedProduct.active,
        boy: selectedProduct.boy,
        girl: selectedProduct.girl,
        child: selectedProduct.child,
        latest_collection: selectedProduct.latest_collection,
        our_best_seller: selectedProduct.our_best_seller
      });
    }
  }, [selectedProduct]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-bg my-10">
      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        
        {/* Image Upload */}
        <ImageUpload preview={preview} setPreview={setPreview} imageInput={imageInput}/>

        {/* Inputs Section */}
        <InputName nameInpeEn={nameInpeEn} nameInpeAr={nameInpeAr}/>

        {/* price Quantity */}

        <PriceQuantityRelease priceInput={priceInput} numberInput={numberInput} Release={Release}/>

        <div className="flex flex-col gap-2">
          <label className='font-bold text-primary text-sm'>{t("Colors (comma separated)")}</label>
          <input type="text" ref={colorInput} placeholder="Red, Blue, Black" className="w-full p-3 outline-none  shadow-lg text-secondary bg-secondary/10 rounded-xl border border-transparent focus:border-primary transition-all" />
        </div>

        {/* Textareas */}
        <Description descriptionInputEn={descriptionInputEn} descriptionInputAr={descriptionInputAr}/>

        {/* Toggles Group */}
        <TogglesGroup flags={flags} setFlags={setFlags}/>

        {/* Buttons */}
        <Buttons setOpenAdd={setOpenAdd} selectedProduct={selectedProduct} latestCount={latestCount} ourBestSeller={ourBestSeller}/>
      </form>
    </div>
  );
};



export default AddProduct;