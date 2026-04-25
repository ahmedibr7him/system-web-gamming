import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../Redux/Login/LoginSlice";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HeroVariants } from "../Animation";
import { showToast } from "../../Redux/toast/Toast";

const Signin = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState({ password: false });

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handelSubmit = async(e) => {
    e.preventDefault();
    
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const userData = { name, email, password };

    await dispatch(signUp(userData)).unwrap()
      .then(async() => {
        nameInputRef.current.value = "";
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        await dispatch(showToast({
          message:"Your account has been created successfully",
          type:"success"
        }))
       setTimeout(()=>{
        navigate(`/home/${i18n.language}`)
       },100)
      })
      .catch(async(err) => {
         await dispatch(showToast({
          message:"An error occurred while creating the account.",
          type:"success"
        }))
        return err.message
      });
  };

  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center p-4 bg-bg mt-20">
      <motion.section 
        {...HeroVariants.image} 
        className='w-full max-w-100 md:max-w-212.5 lg:h-120 md:h-137.5  rounded-3xl shadow-2xl bg-white flex flex-col md:flex-row relative overflow-hidden'
      >
        <div className='md:w-[40%] w-full bg-primary flex flex-col items-center justify-center gap-6 p-8 text-center text-white'>
          <h3 className='text-3xl lg:text-4xl font-bold'>{t("Welcome Back !")}</h3>
          <p className='font-medium opacity-90 text-sm lg:text-base'>
            {t("To keep connected with us please Login with your personal info")}
          </p>
          <button 
            aria-label="Go to Sign In" 
            onClick={() => navigate(`/login/${i18n.language}`)} 
            className="mt-2 cursor-pointer rounded-full px-8 py-2.5 font-bold bg-white text-primary hover:bg-bg transition-all duration-300 shadow-lg active:scale-95"
          >
            {t("SignIn")}
          </button>
        </div>

        {/* Right Side: Create Account Form */}
        <div className='md:w-[60%] w-full flex flex-col justify-center items-center gap-6 p-8 lg:p-12 bg-white'>
          <div className="text-center">
             <h4 className="text-3xl lg:text-4xl font-black text-primary mb-2">{t("Create Account")}</h4>
             <p className="text-sm font-semibold text-secondary/70 ">{t("or use your email for registration :")}</p>
          </div>
          
          <form onSubmit={handelSubmit} className="flex flex-col justify-center items-center gap-4 w-full max-w-sm">
            {/* Name Input */}
            <div className="relative w-full">
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50"></i>
              <input 
                type="text" 
                ref={nameInputRef} 
                required 
                placeholder={t("Full Name")} 
                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 bg-bg/50 border border-transparent focus:bg-white transition-all text-secondary"
              />
            </div>

            {/* Email Input */}
            <div className="relative w-full">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50"></i>
              <input 
                type="email" 
                ref={emailInputRef} 
                required 
                placeholder={t("Enter the Email")} 
                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 bg-bg/50 border border-transparent focus:bg-white transition-all text-secondary"
              />
            </div>

            {/* Password Input */}
            <div className="relative w-full">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50"></i>
              <input 
                ref={passwordInputRef} 
                type={showPassword.password ? "text" : "password"} 
                required 
                placeholder={t("Enter PassWord")} 
                className="w-full pl-12 pr-12 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 bg-bg/50 border border-transparent focus:bg-white transition-all text-secondary"
              />
              <span 
                onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))} 
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-secondary/50 hover:text-primary transition-colors"
              >
                {showPassword.password ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
              </span>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              type="submit" 
              className="mt-4 cursor-pointer rounded-full px-10 py-3 w-full font-bold bg-primary text-white shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10"> 
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                     <i className="fa-solid fa-circle-notch animate-spin"></i> {t("Loading...")}
                  </span>
                ) : t("SignUp")}
              </span>
            </button>
          </form>
        </div>
      </motion.section>
    </section>
  );
}

export default Signin;