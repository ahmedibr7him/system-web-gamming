import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const { t, i18n } = useTranslation();

  const menu = [
    { id: 1, title: "Dashboard", link: "", icon: "fa-solid fa-chart-pie" },
    { id: 2, title: "Categories", link: "categories", icon: "fa-solid fa-layer-group" },
    { id: 5, title: "Orders", link: "orders", icon: "fa-solid fa-arrow-up-wide-short" },
    { id: 6, title: "Users", link: "users", icon: "fa-solid fa-users" },
    { id: 7, title: "Reviews", link: "reviews", icon: "fa-solid fa-star-half-stroke" },
    { id: 8, title: "Message", link: "message", icon: "fa-solid fa-receipt" },
    { id: 3, title: "About", link: "about", icon: "fa-solid fa-circle-info" },
    { id: 4, title: "How it Works", link: "howitwork", icon: "fa-solid fa-arrow-rotate-right" },
    { id: 9, title: "Contact Info", link: "datacontact", icon: "fa-brands fa-meta" },
  ];

  return (
    <ul className="w-full flex flex-col gap-1 px-2">
      {menu.map((item) => (
        <li key={item.id} className="w-full">
          <NavLink to={`/dashbourd/${item.link}${item.link ? "/" : ""}${i18n.language}`} end={item.link === ""}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-1" 
                : "text-secondary/70 hover:bg-bg hover:text-primary hover:translate-x-1"
              }`
            }
          >
            <i className={`${item.icon} text-lg transition-transform duration-300 group-hover:scale-110`}></i>
            <span className="font-bold text-sm tracking-wide">{t(item.title)}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menu;