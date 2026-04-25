import Chart from "../component/dashbourd/Chart"
import { useTranslation } from "react-i18next"
import StatsCards from "../component/dashbourd/StatsCards"
import RecentOrders from "../component/dashbourd/RecentOrders" // مكون جديد
import RecentActivities from "../component/dashbourd/RecentActivities";

const Dashbourd = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-10 p-2">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-black text-3xl text-primary tracking-tight">{t("General Admin")}</h1>
        <p className="text-secondary/60 text-sm font-medium">{t("Overview of your store performance")}</p>
      </div>

      {/* Stats Cards Grid */}
      <StatsCards />


        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-bg">
          <div className="mb-6 flex justify-start items-center">
             <h3 className="font-bold text-xl text-primary">{t("Sales Analytics")}</h3>   
          </div>
          <Chart />
        </div>


  

  
    </section>
  );
};

export default Dashbourd;