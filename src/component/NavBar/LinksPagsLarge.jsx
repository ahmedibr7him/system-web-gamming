import { NavLink } from "react-router-dom";
import { useContext, useMemo } from "react";
import { LinksContext } from "../../Context/LinksContext";
import { useTranslation } from "react-i18next";

const LinksPagsLarge = () => {
  const { linksLarge } = useContext(LinksContext);
  const { i18n, t } = useTranslation();

  const renderedLinks = useMemo(() => {
    return linksLarge.map((link) => (
      <li key={link.id} className="relative group">
        <NavLink to={`${link.link}/${i18n.language}`} end={link.link === "/home"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={({ isActive }) => `
            relative z-10 px-6 h-10 flex items-center justify-center
            text-sm font-bold tracking-tight transition-all duration-300 rounded-xl
            ${isActive 
              ? "text-primary bg-primary/5" 
              : "text-gray-500 hover:text-primary hover:bg-gray-50"
            }
          `}
        >
         
          <span>{t(`${link.name}`)}</span>
        </NavLink>

        <NavLink to={`${link.link}/${i18n.language}`} end={link.link === "/home"}className={({ isActive }) =>   isActive     ? "absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full z-20"     : "hidden" }
        />
      </li>
    ));
  }, [linksLarge, i18n.language, t]);

  return (
    <nav className="h-full flex items-center">
      <ul className="flex items-center gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 shadow-sm">
        {renderedLinks}
      </ul>
    </nav>
  );
};

export default LinksPagsLarge;