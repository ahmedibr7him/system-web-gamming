import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import i18n from "../I18n";
import Navbar from "../../component/NavBar/Navbar";
import LinksProvider from "../../Context/LinksContext";
import { Footer } from "../../component/Footer";

const LocaleLayOut = () => {
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lang = segments[segments.length - 1];

    if (lang === "ar" || lang === "en") {
      i18n.changeLanguage(lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <LinksProvider>
        <Navbar />

        <main className="grow">
          <Outlet />
        </main>

        <Footer />
      </LinksProvider>
    </div>
  );
};

export default LocaleLayOut;