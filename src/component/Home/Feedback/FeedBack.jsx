import Title from "../../Title"
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";
import { assesst } from "../../../../public/assesst";
const FeedBack = () => {
    const {dataFeedback}=useSelector((state)=>state.reviewSlice)||[];
       const {i18n}=useTranslation()
       const isArabic =i18n.language ==="ar"
  return (
    <>
    <div className='text-center w-[90%] m-auto mb-15' dir={i18n.language === "ar" ? "Ltr":"Ltr" }>
    <Title title="FeedBack" subTitle="We value your feedback. Tell us about your experience to help us improve."/>
    <Marquee
  speed={50}          
  gradient={false}    
  pauseOnHover={true} 
  direction="left"  
  className="my-15 "
>
  {dataFeedback?.map((item) => (
  <div
  key={item.id}
  className="mx-4 w-75 bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4 
             transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
>
  {/* Header */}
  <div className="flex items-center gap-3">
    <img
      src={item.image || assesst.imageBoy}
      fetchPriority="high" loading="eager"
      alt={item.name_en}
      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
    />

    <div className="flex flex-col">
      <p className="text-base font-semibold text-primary">
        {isArabic ? item.name_ar : item.name_en}
      </p>

      {/* Stars */}
      <div className="flex gap-0.5 mt-1">
        {Array.from({ length: item.number })
          .slice(0, 5)
          .map((_, i) => (
            <i key={i} className="fa-solid fa-star text-amber-400 text-xs"></i>
          ))}
      </div>
    </div>
  </div>

  {/* Description */}
  <p className="text-sm text-secondary leading-relaxed line-clamp-3">
    {isArabic ? item.description_ar : item.description_en}
  </p>

  {/* Footer */}
  <div className="flex items-center justify-between mt-2">
    <span className="text-xs text-gray-400" aria-label="Rating 4 out of 5">
     < i  className="fa-solid fa-star text-amber-500 text-[14px]"></i> {item.number}/5
    </span>

    <span className="text-xs text-primary font-medium">
      Feedback
    </span>
  </div>
</div>
  ))}
</Marquee>
    </div>
    </>
  )
}

export default FeedBack
