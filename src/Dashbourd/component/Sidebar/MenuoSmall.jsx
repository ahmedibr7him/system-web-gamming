import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
const MenuoSmall = () => {
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
     <ul className="flex items-center gap-6 min-w-max">
        {menu.map((item) => (
          <li key={item.id} className="shrink-0">
 <NavLink to={`/dashbourd/${item.link}${item.link ? "/" : ""}${i18n.language}`}end={item.link === ""}className={({ isActive }) =>`flex flex-col items-center justify-center gap-1 transition-all duration-300 min-w-15${isActive ? "text-primary scale-110" : "text-secondary/60"}`}>
  {({ isActive }) => (
    <>
      <i className={`${item.icon} text-lg   ${isActive?"text-primary":"text-secondary"}`}></i>
      <span aria-label={item.title} className="text-[9px] font-bold uppercase tracking-tighter text-center text-secondary">
        {t(item.title)}
      </span>

      <div className={`h-1 w-1 rounded-full transition-all duration-300 ${isActive ? "bg-primary scale-150" : "bg-transparent"}`} />
    </>
  )}
</NavLink>
          </li>
        ))}
      </ul>
  )
}

export default MenuoSmall
