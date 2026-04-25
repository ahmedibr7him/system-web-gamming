const NavButton = ({ onClick, icon, direction }) => (
  <button 
    aria-label={`slide ${direction}`}
    onClick={onClick} 
    className='w-11 h-11 rounded-full bg-secondary text-bg shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer'
  >
    <i className={`fa-solid ${icon}`}></i>
  </button>
);
 export default NavButton