import { createContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
export const LinksContext = createContext();

const LinksProvider = ({children})=>{
     const [OpenLinks , setOpenLinks] =useState(false);
     const [openLogin , setOpenLogin] =useState(false);
     const {user} =useSelector((state)=>state.auth)
   const linksLarge = [
  { name: "Home", link: "/home", id: 1 },
  { name: "Product", link: "/product", id: 2 },
  { name: "Contact", link: "/contact", id: 3 },
  ...(user?.role === "admin"
  ? [{ name: "Dashboard", link: "/dashbourd", id: 6 }]
  : []),
];

const linksSmall= [
  { name: "Home", link: "/home", id: 1 },
  { name: "Product", link: "/product", id: 2 },
  { name: "Contact Us", link: "/contact", id: 3 },
  { name: "Orders", link: "/order", id: 4 },
  { name: "Favourite", link: "/favourite", id: 5 },
  ...(user?.role === "admin"
  ? [{ name: "Dashboard", link: "/dashbourd", id: 6 }]
  : []),
];
    const value ={OpenLinks ,setOpenLinks ,linksLarge,linksSmall,openLogin,setOpenLogin}
    return(
        <LinksContext.Provider value={value}>
            {children}
        </LinksContext.Provider>
    )
}

export default LinksProvider;