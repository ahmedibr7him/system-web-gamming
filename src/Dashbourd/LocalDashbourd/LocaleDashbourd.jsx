import { Outlet, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../component/Sidebar/Sidebar";
import NavbarDashboard from "../component/NavbarDashboard/NavbarDashboard";
import { GetOrder } from "../Redux/orders/OrderSlice";
import { useDispatch } from "react-redux";

const SidebarSmall = lazy(() => import("../component/Sidebar/SidebarSmall"));

const LocaleDashbourd = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const dispatch =useDispatch();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lang = segments[segments.length - 1];

    if (lang === "ar" || lang === "en") {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      
     
      document.body.style.fontFamily = lang === "ar" ? "var(--font-ar)" : "var(--font-en)";
    }
  }, [location.pathname, i18n]);

  useEffect(()=>{
    dispatch(GetOrder())
  },[dispatch])


  return (
    <div className="relative h-screen overflow-hidden bg-bg">
      <div className="flex h-full overflow-hidden">
        
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <NavbarDashboard />
          
          
          <Suspense fallback={
            <div className="flex h-64 items-center justify-center">
               <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>

    
      <Suspense fallback={null}>
        <div className="absolute bottom-0 w-full h-20 z-50 md:hidden">
          <SidebarSmall />
        </div>
      </Suspense>
    </div>
  );
};

export default LocaleDashbourd;