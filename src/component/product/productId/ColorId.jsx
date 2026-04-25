import { useState ,useEffect } from "react";
import { useTranslation } from "react-i18next";
const ColorId = ({data,setNum ,id,setColor,color}) => {
    const{t}=useTranslation()
        
    useEffect(() => {
    if (data?.color?.length) {
      setColor(data.color[0]);
    }
    setNum(1); 
  }, [data, id]);
  return (
    <>
    <div className="flex flex-col gap-3">
            <p className="text-primary font-bold text-lg">{t("Available Colors :")}</p>
            <div className="flex gap-4">
              {data?.color?.map((item, index) => (
                <button
                  key={index}
                  aria-label="color"
                  style={{ backgroundColor: `#${item}` }}
                  onClick={() => setColor(item)}
                  className={`w-7 h-7 cursor-pointer rounded-full border-2 transition-all flex items-center justify-center border-primary border-2${
                    color === item ? "border-secondary scale-110" : "border-transparent"
                  }`}
                >
                  {color === item && (
                    <i className="fa-solid fa-check text-primary text-[15px]"></i>
                  )}
                </button>
              ))}
            </div>
          </div>
    </>
  )
}

export default ColorId
