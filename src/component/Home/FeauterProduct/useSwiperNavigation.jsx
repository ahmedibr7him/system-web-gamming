
import { useCallback } from 'react';
export const useSwiperNavigation =({swiperRef})=>{
    const handleNext = useCallback(() =>{swiperRef.current?.slideNext()}, [swiperRef]);

  const handlePrev = useCallback(() => {swiperRef.current?.slidePrev()}, [swiperRef]);

  return { handleNext, handlePrev };
}