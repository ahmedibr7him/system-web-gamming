import { useNavigate,useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ButtonLang = () => {
    const {i18n}=useTranslation()
      const location =useLocation()
  const navigate =useNavigate()

  const toggleLang = () => {
  const newLang = i18n.language === "en" ? "ar" : "en";
  i18n.changeLanguage(newLang);

  const newPath = location.pathname.replace(/\/(en|ar)$/, `/${newLang}`);
  navigate(newPath);
};
  return (
   <>
      <button 
          onClick={toggleLang}
          className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-secondary font-bold hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
        >
          {i18n.language === 'en' ? 'AR' : 'EN'}
        </button>
   </>
  )
}

export default ButtonLang
