import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { HeroVariants } from '../../../component/Animation';
import MenuAdminLogOut from './MenuAdminLogOut';
import ButtonLang from './ButtonLang';
import UserName from './UserName';

const NavbarDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <motion.nav {...HeroVariants.image}className="w-[98%] mx-auto mb-10 h-20 bg-white border border-bg px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg rounded-2xl ">
      {/* user */}
      <UserName user={user}/>
      <div className="flex items-center gap-3 md:gap-6">
        {/* button lang */}
     <ButtonLang/>

        <div className="relative cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-secondary group-hover:text-primary transition-all shadow-sm">
            <i className="fa-regular fa-bell text-xl"></i>
          </div>
         
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="h-8 w-px bg-bg hidden md:block"></div>

       {/* menuAdmin */}
       <MenuAdminLogOut user={user}/>
      </div>
    </motion.nav>
  );
};

export default NavbarDashboard;