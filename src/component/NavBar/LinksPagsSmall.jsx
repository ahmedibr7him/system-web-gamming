import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LinksContext } from "../../Context/LinksContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HeroVariants } from "../Animation";

const LinksPagsSmall = () => {
    const { linksSmall, setOpenLinks } = useContext(LinksContext);
    const { i18n, t } = useTranslation();
    const isArabic = i18n.language === "ar";
    const handleLinkClick = () => {
        setOpenLinks(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.div 
            {...HeroVariants.fadeUp}
            className='fixed inset-0 z-100 bg-white flex flex-col items-center justify-center overflow-hidden'
        >
            
            <div className="absolute top-0 left-0 w-full h-20 px-6 flex items-center justify-between border-b border-gray-50 bg-white">
                <button 
                    onClick={() => setOpenLinks(false)} 
                    className="flex items-center gap-2 text-primary font-bold cursor-pointer"
                >
                    <i className={`fa-solid ${isArabic ? "fa-angle-right" : "fa-angle-left"}`}></i>
                    <span>{t("Back")}</span>
                </button>

                <span className="font-black text-primary tracking-tighter italic">Ahmed</span>
            </div>

            
            <nav className="w-full px-6">
                <ul className="flex flex-col gap-4">
                    {linksSmall.map((link, index) => (
                        <motion.li 
                            key={link.id}
                            {...HeroVariants.image}
                            className="w-full"
                        >
                            <NavLink 
                                to={`${link.link}/${i18n.language}`} 
                                end={link.link === "/home"}
                                onClick={handleLinkClick}
                                className={({ isActive }) => `
                                    flex items-center justify-between w-full p-5 rounded-2xl transition-all duration-300 font-black text-xl
                                    ${isActive 
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                                        : "bg-gray-50 text-primary hover:bg-gray-100"
                                    }
                                `}
                            >
                                <span>{t(`${link.name}`)}</span>
                                <i className={`fa-solid fa-chevron-${isArabic ? 'left' : 'right'} text-xs opacity-50`}></i>
                            </NavLink>
                        </motion.li>
                    ))}
                </ul>
            </nav>

            {/* Footer بسيط للقائمة */}
            <div className="absolute bottom-10 flex flex-col items-center gap-4">
                 <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">© 2026 Ahmed Ibrahim</p>
            </div>
        </motion.div>
    );
};

export default LinksPagsSmall;