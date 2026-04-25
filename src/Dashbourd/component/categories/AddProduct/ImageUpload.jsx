
import { useTranslation } from 'react-i18next'

const ImageUpload = ({preview,setPreview,imageInput}) => {
     const {t}=useTranslation()
  return (
    <>
   <div className='col-span-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-bg rounded-2xl bg-bg/20'>
          <label htmlFor="UploadImage" className='font-bold text-primary cursor-pointer text-center'>
            {t("Upload Product Image")}
            {preview && (
              <img src={preview} alt="preview" className="mt-4 w-32 h-32 object-contain rounded-xl shadow-md border bg-white" />
            )}
            <input type="file" id='UploadImage' onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} ref={imageInput} className="hidden" />
            <div className="mt-4 text-sm text-secondary bg-white px-4 py-2 rounded-full shadow-sm">
              {t("Click to select image")}
            </div>
          </label>
        </div>
        </>
  )
}

export default ImageUpload
