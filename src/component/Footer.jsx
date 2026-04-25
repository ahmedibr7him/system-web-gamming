import { useTranslation } from "react-i18next";
import { assesst } from "../../public/assesst";
import { Link } from "react-router-dom"; 

export const Footer = () => {
    const { t, i18n } = useTranslation();

    const connect = [
        { id: 1, path: "https://facebook.com", icone: "fa-facebook" ,type:"facebook"},
        { id: 2, path: "https://linkedin.com", icone: "fa-linkedin" ,type:"linkedin"},
        { id: 3, path: "https://instagram.com", icone: "fa-instagram" ,type:"instagram"},
        { id: 4, path: "https://wa.me/201550165755", icone: "fa-whatsapp" ,type:"phone"},
    ];

    const typeProduct = [
        { id: 1, name: "Boy's Collection", link: "/product" },
        { id: 2, name: "Girl's Collection", link: "/product" },
        { id: 3, name: "Kid's Collection", link: "/product" },
    ];

    const quikLink = [
        { id: 1, name: "Home", link: "/home" },
        { id: 2, name: "Product", link: "/product" },
        { id: 5, name: "Contact Us", link: "/contact" },
    ];

    return (
        <>
            <footer className="w-full p-8 lg:p-12 m-auto bg-white grid grid-cols-1 lg:grid-cols-4 gap-10 overflow-hidden border-t border-bg">
                {/* Logo and About */}
                <div className="flex flex-col gap-4">
                    <img src={assesst.logo} width={48} height={48}  fetchPriority="high" alt="logo" className="w-12 h-12 object-contain" />
                    <p className="text-secondary leading-relaxed text-sm lg:text-base">
                        {t("Delivering quality products right to your doorstep. Fast, reliable, and always affordable. Your trust is what drives us forward.")}
                    </p>
                    <ul className="flex items-center gap-5 mt-2">
                        {connect.map((item) => (
                            <li key={item.id} aria-label={item.type}>
                                <a href={item.path} aria-label={t(`Visit our ${item.type} page`)} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                                    <i className={`fa-brands ${item.icone} text-2xl text-secondary hover:text-primary`}></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Links Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 col-span-1 lg:col-span-3 gap-10">
                    {/* Types of Product */}
                    <div className="flex flex-col gap-6">
                        <p className="text-xl font-bold text-primary border-b-2 border-primary w-fit pb-1">{t("Types of Product")}</p>
                        <div className="flex flex-col gap-3">
                            {typeProduct.map((item) => (
                                <Link key={item.id} to={`${item.link}/${i18n.language}`} className="text-secondary font-semibold hover:text-primary transition-all">
                                    {t(item.name)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <p className="text-xl font-bold text-primary border-b-2 border-primary w-fit pb-1">{t("Quick Links")}</p>
                        <div className="flex flex-col gap-3">
                            {quikLink.map((item) => (
                                <Link key={item.id} to={`${item.link}/${i18n.language}`} className="text-secondary font-semibold hover:text-primary transition-all">
                                    {t(item.name)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Us & Newsletter */}
                    <div className="flex flex-col gap-6">
                        <p className="text-xl font-bold text-primary border-b-2 border-primary w-fit pb-1">{t("Contact Us")}</p>
                        <div className="flex flex-col gap-4 text-secondary text-sm">
                            <p className="flex items-center gap-2">
                                <i className="fa-solid fa-location-dot text-primary"></i>
                                <span>{t("Mit Ghamr – Dakahlia, Egypt")}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <i className="fa-solid fa-phone text-primary"></i>
                                <span dir="ltr">01550165755</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <i className="fa-solid fa-envelope text-primary"></i>
                                <span className="break-all">ahmedibrahim5112004@gmail.com</span>
                            </p>
                            
                            {/* Newsletter Input */}
                            <div className="flex mt-4 h-10" dir="ltr">
                                <input 
                                    type="email" 
                                    placeholder={t("Enter your Email...")} 
                                    className="flex-1 outline-none bg-bg shadow-inner px-3 rounded-l-lg border border-transparent focus:border-primary transition-all" 
                                />
                                <button 
                                    aria-label="subscribe" 
                                    type="submit" 
                                    className="bg-primary text-white px-4 rounded-r-lg font-bold hover:bg-opacity-90 transition-all"
                                >
                                    {t("Subscribe")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Copyright Section */}
            <div className="w-full py-6 border-t border-bg bg-white text-center text-secondary text-xs md:text-sm">
                <p>Copyright © 2026 All rights reserved | Made with by Ahmed Ibrahim</p>
            </div>
        </>
    );
};