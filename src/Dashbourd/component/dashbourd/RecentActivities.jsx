import { useTranslation } from "react-i18next"

const RecentActivities = () => {
    const {t}=useTranslation()
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-bg">
          <h3 className="font-bold text-xl text-primary mb-6">{t("Recent Activities")}</h3>
          
          <div className="flex flex-col gap-4">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="flex items-center gap-3 p-2 hover:bg-bg rounded-xl transition-all cursor-pointer">
                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                   <i className="fa-solid fa-plus"></i>
                 </div>
                 <div>
                   <p className="text-sm font-bold text-secondary">New Order #2345</p>
                   <p className="text-[10px] text-secondary/50">2 mins ago</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
  )
}

export default RecentActivities
