import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Login/LoginSlice";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HeroVariants } from "../Animation";
import { showToast } from "../../Redux/toast/Toast";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState({ password: false });

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handelSubmit = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const userData = { email, password };

    dispatch(login(userData))
      .unwrap()
      .then(() => {
        dispatch(showToast({
          message:"Login successful",
          type: "success"
        }));
        // emailInputRef.current.value = "";
        // passwordInputRef.current.value = "";
        setTimeout(()=>{
          navigate(`/home/${i18n.language}`)
        },100)
      })
      .catch((err) => {
        dispatch(showToast({
          message: "login_error", 
          type: "error"
        }));
      });
  };

  return (
    <section className="w-full min-h-screen bg-bg flex justify-center items-center p-4 ">
      <motion.section 
        {...HeroVariants.image} 
        className='w-full max-w-100 md:max-w-212.5 lg:h-120 md:h-137.5 mt-20  rounded-3xl shadow-2xl bg-white flex flex-col md:flex-row relative overflow-hidden'
      >
        {/* Form Side (Right in Desktop, Bottom in Mobile) */}
        <div className='md:w-[65%] w-full h-full flex flex-col justify-center items-center gap-6 p-8 order-2 md:order-1'>
          <div className="text-center">
            <h4 className="text-4xl font-black text-primary mb-2">{t("Log in")}</h4>
            <p className="text-sm font-semibold text-secondary/70">{t("or use your email for registration :")}</p>
          </div>

          <form onSubmit={handelSubmit} className="flex flex-col justify-center items-center gap-4 w-full max-w-sm">
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
                type={showPassword.password ? "text" : "password"} 
                ref={passwordInputRef} 
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

            <button 
              aria-label="Sign In" 
              type="submit" 
              disabled={loading}
              className="mt-4 cursor-pointer rounded-full px-10 py-3 w-full font-bold bg-primary text-white shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50"
            >
              <span className="relative"> 
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin"></i> {t("Loading...")}
                  </span>
                ) : t("SignIn")}
              </span>
            </button>
          </form>
        </div>

        {/* Info Side (Left in Desktop, Top in Mobile) */}
        <div className='md:w-[35%] w-full bg-primary flex flex-col items-center justify-center gap-6 p-8 text-center order-1 md:order-2 text-white shadow-inner'>
          <h3 className='text-3xl lg:text-4xl font-bold'>{t("New Here?")}</h3>
          <p className='font-medium opacity-90 text-sm'>
            {t("To keep connected with us please Sign Up with your personal info")}
          </p>
          <button 
            aria-label="Go to Sign Up" 
            onClick={() => navigate(`/singup/${i18n.language}`)} 
            className="cursor-pointer rounded-full px-8 py-2.5 font-bold bg-white text-primary hover:bg-bg transition-all duration-300 shadow-lg active:scale-95"
          >
            {t("SignUp")}
          </button>
        </div>
      </motion.section>
    </section>
  );
};

export default Login;