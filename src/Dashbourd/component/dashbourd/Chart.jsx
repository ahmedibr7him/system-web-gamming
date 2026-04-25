import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { GetCompletedOrders } from "../../../Dashbourd/Redux/orders/OrderSlice"; 
import { GetTargets } from "../../../Dashbourd/Redux/target/Target";

const Chart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { completedOrders, loading } = useSelector((state) => state.orderItem); 
  const { targets } = useSelector((state) => state.targets);

  useEffect(() => {
    dispatch(GetCompletedOrders());
    dispatch(GetTargets());
  }, [dispatch]);

  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const monthlyData = months.map((month) => ({
      name: t(month),
      sales: 0,
      target: 8000,
    }));

  
    if (completedOrders && Array.isArray(completedOrders)) {
      completedOrders.forEach((order) => {
        if (order.created_at) {
          const date = new Date(order.created_at);
          const monthIndex = date.getMonth(); 
          if (monthlyData[monthIndex]) {
            monthlyData[monthIndex].sales += Number(order.total_price) || 0;
          }
        }
      });
    }

    if (targets && Array.isArray(targets)) {
      targets.forEach((targetItem) => {
        if (monthlyData[targetItem.month_index]) {
          monthlyData[targetItem.month_index].target = targetItem.amount || 0;
        }
      });
    }

    return monthlyData;
  }, [completedOrders, targets, t]);

  if (loading && chartData[0].sales === 0) {
    return <div className="h-87.5 flex items-center justify-center">{t("Loading...")}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm" dir="ltr">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-primary text-xl font-black tracking-tight">
          {t("Sales Analytics")}
        </h2>
        
        <div className="flex gap-4 text-xs font-bold text-secondary/50">
           <span className="flex items-center gap-1">
             <span className="w-3 h-1 bg-[#00a8a8] rounded-full"></span> {t("Actual Sales")}
           </span>
           <span className="flex items-center gap-1">
             <span className="w-3 h-1 bg-gray-300 border-t border-dashed rounded-full"></span> {t("Target")}
           </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <Tooltip 
             contentStyle={{ 
               borderRadius: '15px', 
               border: 'none', 
               boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
               fontSize: '14px'
             }}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#00a8a8"
            strokeWidth={4}
            dot={{ r: 4, fill: "#00a8a8", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />

          <Line
            type="monotone"
            dataKey="target"
            stroke="#d1d5db"
            strokeWidth={2}
            strokeDasharray="8 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;