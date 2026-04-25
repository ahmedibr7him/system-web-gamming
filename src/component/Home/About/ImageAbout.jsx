import { HeroVariants } from "../../Animation"
 import { assesst } from '../../../../public/assesst'
const ImageAbout = () => {

   
  return (
    <>
      <div className='flex flex-col gap-2' >  
            <div
            
            className='flex gap-2  shadow-2xl w-fit'>
                <img src={assesst.imageOne}   fetchPriority="high"  loading="eager" decoding="async"  alt="imageAbout" width={180} height={180} className='object-contain p-[7px_0px_0px_7px] bg-white shadow rounded-[5px]' />
                <img src={assesst.imageTwo} loading="eager"  fetchPriority="high" decoding="async"  alt="imageAbout" width={180} height={180} className='object-contain p-[7px_7px_0px_0px] bg-white shadow rounded-[5px]' />
            </div>
            <div className='flex gap-2  shadow-2xl w-fit'>
                 <img src={assesst.imageThree} loading="eager"  fetchPriority="high" decoding="async"  alt="imageAbout" width={180} height={180} className='object-contain p-[0px_0px_7px_7px] bg-white shadow rounded-[5px]' />
                <img src={assesst.imageFoure} loading="eager"  fetchPriority="high" decoding="async"  alt="imageAbout" width={180} height={180} className='object-contain p-[0px_7px_7px_0px] bg-white shadow rounded-[5px]' />
            </div>
        </div>
      
    </>
  )
}

export default ImageAbout
