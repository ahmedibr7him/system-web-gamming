import { useTranslation } from "react-i18next"
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCollection } from "../../Redux/AddCollectionSlice"
import { getUsersCount } from "../../../Redux/Login/LoginSlice"

const StatsCards = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(); // أضفنا i18n عشان العملة
    const { collection } = useSelector((state) => state.addCollection);
    const { numberOfUsers } = useSelector((state) => state.auth);
    const { order } = useSelector((state) => state.order);

    const totalRevenue = useMemo(() => {
        if (!order) return 0;
        return order
            .filter(item => item.status === "complete" || item.status === "completed")
            .reduce((acc, curr) => acc + (Number(curr.total_price) || 0), 0);
    }, [order]);

    const statsData = useMemo(() => ([
        { id: 1, title: "Total Users", content: numberOfUsers || 0, icon: "fa-users", color: "text-blue-500" },
        { id: 2, title: "Total Orders", content: order?.length || 0, icon: "fa-cart-shopping", color: "text-orange-500" },
        { 
            id: 3, 
            title: "Total Revenue", 
            content: `${totalRevenue.toLocaleString()} ${i18n.language === 'ar' ? '$' : '$'}`, 
            icon: "fa-money-bill-trend-up", 
            color: "text-green-500" 
        },
        { id: 4, title: "Total Categories", content: collection?.length || 0, icon: "fa-layer-group", color: "text-purple-500" },
    ]), [collection, numberOfUsers, order, totalRevenue, i18n.language]);

    useEffect(() => {
        if (!collection || collection.length === 0) {
            dispatch(GetCollection({ page: 1 }));
        }
        if (!numberOfUsers) {
            dispatch(getUsersCount());
        }
    }, [dispatch, collection.length, numberOfUsers]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((item) => (
                <div 
                    key={item.id} 
                    className="group h-32 bg-white shadow-sm border border-bg rounded-3xl p-5 hover:shadow-xl transition-all duration-300 relative overflow-hidden active:scale-95"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-bg flex items-center justify-center transition-colors group-hover:bg-primary/10`}>
                            <i className={`fa-solid ${item.icon} ${item.color} group-hover:text-primary transition-colors`}></i>
                        </div>
                        <h2 className="text-sm font-bold text-secondary/70">{t(item.title)}</h2>
                    </div>

                    <p className="text-2xl font-black text-primary mt-3 text-right">
                        {item.content}
                    </p>
                    
                    <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-bg rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
            ))}
        </div>
    )
}

export default StatsCards;