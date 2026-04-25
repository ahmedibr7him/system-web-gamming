import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Confirm = ({ totalPrice, totalItems }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const SERVICE_FEE = 80;
  const finalTotal = totalPrice + SERVICE_FEE;

  return (
    <div className='w-full bg-white rounded-4xl shadow-sm p-6 border border-gray-50'>
      
      {/* Items Count */}
      <div className='flex justify-between items-center mb-4 pb-2 border-b border-dashed border-gray-100'>
        <p className='font-medium text-secondary'>{t("Items Count")}</p>
        <p className='font-bold text-primary'>{totalItems}</p>
      </div>

      {/* Service Fee */}
      <div className='flex justify-between items-center mb-4 pb-2 border-b border-dashed border-gray-100'>
        <p className='font-medium text-secondary'>{t("Service Fee")}</p>
        <p className='font-bold text-primary'>{SERVICE_FEE} $</p>
      </div>

      {/* Final Total */}
      <div className='flex justify-between items-center mb-6'>
        <p className='font-black text-xl text-primary'>{t("Total Amount")}</p>
        <p className='font-black text-2xl text-primary'>
          {finalTotal.toLocaleString()} $
        </p>
      </div>

      {/* Button */}
      <button 
        onClick={() => { navigate(`/confirm/${i18n.language}`); window.scrollTo(0,0); }} 
        aria-label="Confirm Order" 
        
        className="w-full cursor-pointer rounded-2xl py-4 overflow-hidden group bg-primary relative shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12  group-hover:-translate-x-100 ease"></span>
        <span className="relative text-white font-bold tracking-wide">
          {t("Proceed to Confirmation")}
        </span>
      </button>

    </div>
  );
};

export default Confirm;