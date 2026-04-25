import React from 'react';
import { useTranslation } from 'react-i18next';

const InputQuantityId = ({ setNum, num, mins, plus }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor="quantity-input" 
        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1"
      >
        {t("Quantity")}
      </label>

      <div className="flex items-center h-14 shadow-sm border border-gray-100 rounded-2xl overflow-hidden bg-white group focus-within:border-primary/30 transition-all">
        <button 
          type="button"
          aria-label='Decrease quantity' 
          onClick={mins} 
          className="h-full px-5 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-50 text-secondary"
        >
          <i className="fa-solid fa-minus text-xs"></i>
        </button>

        <input
          id="quantity-input"
          type="number"
          value={num}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setNum(Math.max(1, value));
            } else {
              setNum(""); 
            }
          }}
          onBlur={() => { if (num === "") setNum(1); }}
          className="w-14 text-center outline-none font-black text-primary bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button 
          type="button"
          aria-label='Increase quantity' 
          onClick={plus} 
          className="h-full px-5 hover:bg-gray-50 active:bg-gray-100 transition-colors border-l border-gray-50 text-secondary"
        >
          <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default React.memo(InputQuantityId);