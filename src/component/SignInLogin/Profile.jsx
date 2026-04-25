import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Login/LoginSlice'; 
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeroVariants } from '../Animation';
import { showToast } from '../../Redux/toast/Toast';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user } = useSelector((state) => state.auth); 

  const handleLogout = () => {
    dispatch(logout()); 
    dispatch(showToast({
      message:"You have successfully logged out",
      type:"success"
    }))
   setTimeout(()=>{
     navigate(`/login/${i18n.language}`);
   },100)
  };

  return (
    <section className="w-full min-h-screen bg-bg flex justify-center items-center p-4">
      <motion.div 
        {...HeroVariants.image}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-20"
      >
        
        <div className="bg-primary h-32 flex justify-center items-end pb-4">
           <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex justify-center items-center shadow-md -mb-12">
              <i className="fa-solid fa-user text-4xl text-primary"></i>
           </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-8 flex flex-col gap-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-primary capitalize">{user?.name || "User Name"}</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">
              {user?.role || "Member"}
            </span>
          </div>

          <div className="space-y-4">
            {/* Email Field (Read Only) */}
            <div className="flex flex-col gap-1">
              <label className="text-secondary/60 text-sm font-semibold">{t("Email Address")}</label>
              <div className="bg-bg p-3 rounded-xl border border-transparent text-secondary flex items-center gap-3">
                <i className="fa-solid fa-envelope text-primary/50"></i>
                <span className="font-medium xs:text-[12px] md:text-[16px]">{user?.email || "example@mail.com"}</span>
              </div>
            </div>

            {/* Role Field (Read Only) */}
            <div className="flex flex-col gap-1">
              <label className="text-secondary/60 text-sm font-semibold">{t("Role")}</label>
              <div className="bg-bg p-3 rounded-xl border border-transparent text-secondary flex items-center gap-3">
                <i className="fa-solid fa-shield-halved text-primary/50"></i>
                <span className="font-medium">{user?.role || "User"}</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            {t("Logout")}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;