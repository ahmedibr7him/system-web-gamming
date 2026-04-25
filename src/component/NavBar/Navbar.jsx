import LinksPagsLarge from "./LinksPagsLarge"
import { assesst } from "../../../public/assesst";
import { useContext } from "react";
import { LinksContext } from "../../Context/LinksContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LinksPagsSmall from "./LinksPagsSmall";
import MinLogin from "./MinLogin";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
const Navbar = () => {
      const {user} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const {i18n} =useTranslation();
  const {OpenLinks, setOpenLinks,openLogin,setOpenLogin} =useContext(LinksContext);
  const {favorites}=useSelector((state)=>state.favoriteSlice);
  console.log()

  const toggleLang = () => {
  const newLang = i18n.language === "en" ? "ar" : "en";
  i18n.changeLanguage(newLang);

  const newPath = location.pathname.replace(/\/(en|ar)$/, `/${newLang}`);
  navigate(newPath);
};

  const {cart}=useSelector((state)=>state.orderLocalSlice);
   
  return (
    <>
    {openLogin && <div className="fixed  w-full min-h-full z-40" onClick={()=>setOpenLogin(false)}></div>}
     {OpenLinks&&<LinksPagsSmall/>}

    <div className="w-[95%] left-1/2 -translate-x-1/2 bg-white shadow-sm rounded-xl h-15  flex justify-between items-center lg:px-10 fixed top-2  z-45 sm:px-2 ">
        {/* logo */}
            <img src={assesst.logo} width={80} height={80} fetchPriority="high" loading="eager"  alt="logo" className="object-contain xs:w-16 xs-h-16 md:w-20 md:h-20"/>
        {/* link pages */}
        <div className="w-110 h-full lg:block xs:hidden">
            <LinksPagsLarge/>

        </div >
        {/* signIn Ligin lang cart favouraite  */}
        <div className="flex  md:justify-end  lg:justify-between items-cente sm:w-60  justify-end gap-5 md:w-150 mmd:w-100 lg:w-80">
           <button onClick={toggleLang} className=" relative inline-flex shadow items-center w-25 h-10 justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white cursor-pointer group xs:w-18 xs:h-8 md:w-27 md:h-10">
    <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
    <span className="relative w-full font-bold text-center text-primary transition-colors duration-300 ease-in-out group-hover:text-white">{i18n.language === "en" ? "العربية" : "English"} </span>
           </button>
           {/* cart */}

          <button 
  aria-label="cart" 
  type="button" 
  onClick={() => navigate(`/cart/${i18n.language}`)} 
  className="relative inline-flex items-center gap-1 h-10 px-2 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
>
  
  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center transition-transform group-hover:scale-105">
    <i className="fa-solid fa-bag-shopping text-sm"></i>
  </div>
  <span className="px-1.5 text-sm font-black text-primary">
    {cart.length}
  </span>

  {cart.length > 0 && (
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-white"></span>
    </span>
  )}
</button>

       {/* heart */}
       <button aria-label="heart" onClick={()=>{navigate(`/favourite/${i18n.language}`);window.scrollTo({top:0,behavior:"smooth"})}}   type="button" className="relative xs:hidden md:block" > <i className="text-primary cursor-pointer text-[20px] fa-solid fa-heart sm:text-[17px] md:text-xl hover:scale-125 transition-all duration-300"></i><p className="absolute -right-2 -top-1 w-4 h-4 text-[14px] rounded-full  bg-red-600 flex items-center justify-center pt-px text-white shadow-md ">{favorites.length}</p></button>
     <div className="w-10 h-10 rounded-full relative flex items-center justify-center">
  <button  aria-label="user" type="button" onClick={() => setOpenLogin(prev => !prev)} className="w-full h-full rounded-full cursor-pointer flex items-center justify-center">{user ? ( <img src={assesst.profile} alt="photoProfile" className="w-full h-full rounded-full object-cover" />) : (<i className="text-primary fa-regular text-[20px] fa-user sm:text-[17px] md:text-xl"></i> )}</button>
  {openLogin && <MinLogin />}
</div>
       <button aria-label="staggered" type="button"  onClick={()=>setOpenLinks(prev => !prev)} className="xs:block lg:hidden mr-2"><i className="text-primary fa-solid fa-bars-staggered  xs:text-[17px] md:text-xl"></i></button>
        </div>
    </div>
    </>
  )
}

export default Navbar
