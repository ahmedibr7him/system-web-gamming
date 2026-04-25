import { useTranslation } from "react-i18next";

const RecentOrders = () => {
  const { t } = useTranslation();

  // بيانات تجريبية - ستستبدلها ببيانات من الـ Redux لاحقاً
  const orders = [
    { id: "#87654", customer: "Ahmed Ibrahim", product: "iPhone 15 Pro", date: "2026-04-20", amount: "$999", status: "Delivered" },
    { id: "#87653", customer: "Sara Ali", product: "MacBook Air", date: "2026-04-21", amount: "$1200", status: "Pending" },
    { id: "#87652", customer: "Mohamed Omar", product: "AirPods Pro", date: "2026-04-22", amount: "$250", status: "Cancelled" },
    { id: "#87651", customer: "Mona Hassan", product: "Apple Watch", date: "2026-04-23", amount: "$400", status: "Processing" },
  ];
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-600";
      case "Pending": return "bg-orange-100 text-orange-600";
      case "Cancelled": return "bg-red-100 text-red-600";
      case "Processing": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-primary">{t("Recent Orders")}</h3>
        <button className="text-sm font-bold text-primary hover:underline">{t("See All")}</button>
      </div>

      {/* Table Container - Responsive Scroll */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-secondary/50 text-sm border-b border-bg">
              <th className="pb-4 font-semibold">{t("Order ID")}</th>
              <th className="pb-4 font-semibold">{t("Customer")}</th>
              <th className="pb-4 font-semibold">{t("Product")}</th>
              <th className="pb-4 font-semibold">{t("Amount")}</th>
              <th className="pb-4 font-semibold">{t("Status")}</th>
              <th className="pb-4 font-semibold text-center">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="text-secondary">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-bg/50 hover:bg-bg/30 transition-colors">
                <td className="py-4 text-sm font-bold">{order.id}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {order.customer.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{order.customer}</span>
                  </div>
                </td>
                <td className="py-4 text-sm">{order.product}</td>
                <td className="py-4 text-sm font-bold">{order.amount}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(status)}`}>
                    {t(order.status)}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <button className="p-2 hover:bg-bg rounded-lg transition-all text-primary">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;