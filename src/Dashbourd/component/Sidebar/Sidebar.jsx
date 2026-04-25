import { useTranslation } from "react-i18next";
import { assesst } from "../../../../public/assesst";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { t ,i18n} = useTranslation();
  const navigate =useNavigate()

  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-1rem)] bg-white m-2 rounded-3xl shadow-sm border border-bg sticky top-2 left-2 overflow-hidden">
      
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center py-10 px-4 border-b border-bg/50">
        <div className="w-16 h-16 mb-3 p-2 bg-bg rounded-2xl flex items-center justify-center">
          <img  src={assesst.logo}  alt="logo"  className="w-full h-full object-contain"/>
        </div>
        <h1 className="text-xl font-black text-primary tracking-tighter uppercase">
          {t("Dashboard")}
        </h1>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <Menu />
      </div>
      <div className="p-4 mt-auto">
        <div className="bg-bg rounded-2xl p-4 text-center">
          <p className="text-[10px] font-bold text-secondary/40 uppercase mb-2">
            {t("Support Center")}
          </p>
          <button aria-label="gethelp" onClick={()=>navigate(`/dashbourd/gethelp/${i18n.language}`)} className="text-xs font-bold text-primary hover:underline transition-all">
            {t("Get Help")}
          </button>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;