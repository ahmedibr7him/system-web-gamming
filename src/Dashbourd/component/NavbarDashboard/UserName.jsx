import { useTranslation } from "react-i18next"

const UserName = ({user}) => {
    const{t}=useTranslation()
  return (
    <div className="flex flex-col">
        <h2 className="text-secondary font-medium text-sm md:text-base">
          {t("Welcome Back !")}
        </h2>
        <span className="text-primary font-bold text-lg md:text-xl capitalize">
          {user?.name || "Admin Ahmed"} 
        </span>
      </div>
  )
}

export default UserName
