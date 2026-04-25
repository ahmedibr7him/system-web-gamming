import Title from '../../Title'
import DetailsAboutNum from './DetailsAboutNum'
import DetailsAboutDescription from './DetailsAboutDescription'
import ImageAbout from './ImageAbout'
 import { useTranslation } from 'react-i18next'
const AboutCountaint = () => {
     const {i18n} =useTranslation();
    
  return (
    <>
    <div className='text-center w-[90%] m-auto ' dir={i18n.language === "ar" ? "Ltr":"Ltr" }>
        <Title title={"Why Choose Us"} subTitle={" We offer high-quality products, fast delivery, and a smooth shopping experience you can trust."}/>
       <div className='grid xl:grid-cols-3  xs:gap-5 xs:grid-rows-1 xs:items-center  w-full my-15'>
         {/* image */}
      <ImageAbout/>
        {/* details */}
        <div className='w-full h-fit col-span-2'>
            <div className='flex flex-col gap-2'>
                <DetailsAboutNum />
                <DetailsAboutDescription/>
            </div>
        </div>
       </div>

    </div>
    </>
  )
}

export default AboutCountaint
