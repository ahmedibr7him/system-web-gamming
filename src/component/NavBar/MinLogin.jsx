import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Login/LoginSlice";
import { useTranslation } from "react-i18next";
import { showToast } from "../../Redux/toast/Toast";

const MinLogin = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({
      message:"You have successfully logged out",
      type:"success"
    }))
   setTimeout(()=>{
     navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
   },100)
  };

  const navItemClass = ({ isActive }) =>`w-full h-10 px-4 transition-all duration-300 flex justify-center items-center text-sm font-medium ${  isActive ? "bg-primary text-white" : "hover:bg-gray-100 text-secondary"}`;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="w-40 bg-white shadow-xl absolute rounded-xl -left-18 mt-50 py-2 overflow-hidden z-50 border border-gray-100 animate-fade-in-down">
      <ul className="flex flex-col w-full">
        
        {!user ? (
          <>
            <li onClick={scrollToTop}>
              <NavLink to={`/login/${i18n.language}`} className={navItemClass}> {t("SignIn")}</NavLink>
              </li>
            <li onClick={scrollToTop}>
              <NavLink to={`/singup/${i18n.language}`} className={navItemClass}> {t("SignUp")}</NavLink>
            </li>
          </>
        ) : (
          <>
            <li onClick={scrollToTop}>
              <NavLink to={`/profile/${i18n.language}`} className={navItemClass}> {t("Profile")}
              </NavLink>
            </li>
          </>
        )}

        <li onClick={scrollToTop}>
          <NavLink to={`/order/${i18n.language}`} className={navItemClass}>
            {t("Orders")}
          </NavLink>
        </li>

        {user && (
          <li className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="w-full h-10 px-4 text-red-500 hover:bg-red-50 transition-all duration-300 text-sm font-bold flex justify-center items-center"
            >
              {t("Logout")}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default MinLogin;