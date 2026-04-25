import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { HeroVariants } from '../../Animation';

const WorkComponent = () => {
  const { data } = useSelector((state) => state.dataHowItWorks);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  if (!data || data.length === 0) return null;

  return (
    <motion.div 
      {...HeroVariants.image} 
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 my-15'
    >
      {data.map((item) => (
        <div 
          key={item.id} 
          className='group p-8 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-3xl flex flex-col gap-4 justify-center items-center text-center transition-all duration-500 
                     hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl border border-transparent hover:border-primary/10'
        >
          {/* Icon Container */}
          <div className='w-16 h-16 rounded-2xl bg-bg flex items-center justify-center transition-colors duration-500 group-hover:bg-primary group-hover:text-white'>
            <p className='text-3xl md:text-4xl text-primary group-hover:text-white transition-colors duration-500'>
              <i className={`fa-solid ${item.icone}`}></i>
            </p>
          </div>

          <p className='text-xl md:text-2xl font-bold text-primary uppercase tracking-tight'>
            {isArabic ? item.title_ar : item.title_en}
          </p>

          <p className={`text-[14px] leading-relaxed text-secondary ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? item.description_ar : item.description_en}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default WorkComponent;