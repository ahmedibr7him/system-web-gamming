import { useTranslation } from "react-i18next";
import { HeroVariants } from "../../../component/Animation"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Login/LoginSlice";
import { useDispatch } from "react-redux";
const MenuAdminLogOut = ({user}) => {
    const{t,i18n}=useTranslation()
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate =useNavigate()
    const dispatch=useDispatch()
  return (
    <>
     <div className="relative">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 cursor-pointer p-1 hover:bg-bg rounded-xl transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-secondary">{t("Admin")}</span>
              <i className={`fa-solid fa-chevron-down text-[10px] text-secondary transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}></i>
            </div>
          </div>

          
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                {...HeroVariants.image}
                className={`absolute  mt-3 w-48 bg-white rounded-2xl shadow-xl border border-bg p-2 overflow-hidden ${i18n.language ==="ar"?"-right-20":"right-0"}`}
              >
                <button aria-label='profile' onClick={()=>navigate(`/profile/${i18n.language}`)} className="w-full flex items-center gap-3 p-3 text-secondary hover:bg-bg rounded-xl transition-all text-sm font-semibold">
                  <i className="fa-regular fa-user text-primary"></i> {t("Profile")}
                </button>
                <button aria-label='Logout' onClick={()=>dispatch(logout())} className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all text-sm font-bold">
                  <i className="fa-solid fa-right-from-bracket"></i> {t("Logout")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

    </>
  )
}

export default MenuAdminLogOut
