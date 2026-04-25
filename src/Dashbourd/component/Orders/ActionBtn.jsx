import { useTranslation } from "react-i18next";
const ActionBtn = ({ label, icon, color, onClick }) => {
  const {t}=useTranslation()
  return(
  <button 
  aria-label={label}
    onClick={(e) => { e.stopPropagation(); onClick?.(); }}
    className={`px-6 py-3 ${color} text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-lg flex items-center gap-2`}
  >
    <i className={`fa-solid ${icon}`}></i> {t(label)}
  </button>
)};

export default ActionBtn