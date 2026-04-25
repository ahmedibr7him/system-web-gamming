import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useCallback,useEffect } from "react";
import Title from "../../component/Title";
import { deleteOrder, GetOrder } from "../Redux/orders/OrderSlice";
import { deleteOrderItemsByNumber, GetOrderItem } from "../Redux/orders/OrderItemSlice";
import { useTranslation } from "react-i18next";
import DetailsSection from "../component/Orders/DetailsSection";
import OrderItems from "../component/Orders/OrderItems";
import Summary from "../component/Orders/Summary";
import StatusBadge from "../component/Orders/StatusBadge";
import { GetCollection } from "../Redux/AddCollectionSlice";
const Orders = () => {
  const dispatch = useDispatch();
  const {t,i18n}=useTranslation();
  const isArabic =i18n.language ==="ar";
  const [open, setOpen] = useState({ status: false, id: null });

  const { order = [] } = useSelector((state) => state.order || {});
  const { orderItem = [] } = useSelector((state) => state.orderItem || {});
  const { collection = [] } = useSelector((state) => state.addCollection || {});

 
   
const mergeData = useMemo(() => {
    const productsLookup = collection.reduce((acc, prod) => {
      acc[prod.id] = {
        name_en: prod.name_en || "Unknown Product",
        name_ar: prod.name_ar || "منتج غير معروف",
        image: prod.image || null
      };
      return acc;
    }, {});

    const itemsMap = orderItem.reduce((acc, item) => {
      const num = item.order_num;
      if (!acc[num]) acc[num] = [];
      
      const productDetails = productsLookup[item.product_id] || {};
      
      acc[num].push({
        ...item,
        name_en: productDetails.name_en,
        name_ar: productDetails.name_ar,
        image: productDetails.image,
      });
      return acc;
    }, {});

    return order.map((orderData) => {
      const items = itemsMap[orderData.order_number] || [];
      const firstItem = items[0] || {};
      
      return {
        ...orderData,
        customer: {
          name: firstItem.full_name || "Unknown",
          email: firstItem.email || "N/A",
          phone: firstItem.phone_number || "N/A",
          address: `${firstItem.governorate} / ${firstItem.city}`,
          details: firstItem.detailsaddress
        },
        logistics: {
          payment: firstItem.payment || "Cash",
          type: firstItem.type || "Online",
          message: firstItem.send_message
        },
        stats: {
          totalQty: items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
          itemCount: items.length
        },
        products: items
      };
    });
  }, [order, orderItem, collection]);

  const selected = useMemo(() => 
    mergeData.find(item => item.order_number === open.id), 
    [mergeData, open.id]
  );

  const toggleDetails = useCallback((id) => {
    setOpen(prev => (prev.id === id && prev.status) ? { status: false, id: null } : { status: true, id });
  }, []);


  const handleDelete = async (id, orderNum) => {
    if (orderNum) {
      await dispatch(deleteOrder(id)).unwrap();
      await dispatch(deleteOrderItemsByNumber(orderNum)).unwrap();
      setOpen({ status: false, id: null });
    }
  };
  useEffect(() => {
  const fetchAllData = async () => {
    try {
      await Promise.all([
        dispatch(GetOrder()).unwrap(),
        dispatch(GetOrderItem()).unwrap(),
        dispatch(GetCollection())
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  fetchAllData();
}, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4">
      <Title title="Orders Dashboard" subTitle={`${mergeData.length} active orders processed`} />

      <div className="bg-white rounded-4xl shadow-xl shadow-gray-100/50 mt-8 overflow-hidden border border-gray-50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/80 text-secondary uppercase text-[11px] font-bold tracking-widest">
                <th className="p-6 border-b">{t("Orders")}</th>
                <th className="p-6 border-b">{t("Customer")}</th>
                <th className="p-6 border-b text-center">{t("Items")}</th>
                <th className="p-6 border-b">{t("Status")}</th>
                <th className="p-6 border-b text-right">{t("Action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mergeData.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => toggleDetails(item.order_number)}
                  className={`group cursor-pointer transition-all hover:bg-primary/2 ${open.id === item.order_number ? 'bg-primary/4' : ''}`}
                >
                  <td className="p-6">
                    <span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">#{item.order_number}</span>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-gray-800">{item.customer.name}</div>
                    <div className="text-xs text-secondary italic">{item.customer.email}</div>
                  </td>
                  <td className="p-6 text-center font-mono font-bold text-gray-600">{item.stats.totalQty}</td>
                  <td className="p-6"><StatusBadge status={item.status} /></td>
                  <td className="p-6 text-right">
                    <div className={`w-8 h-8 inline-flex items-center justify-center rounded-full transition-all ${open.id === item.order_number ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                      <i className="fa-solid fa-chevron-down text-[10px]"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETAILS SECTION */}
        {open.status && selected && (
          <div className="p-8 bg-gray-50/50 border-t border-gray-100 animate-slideDown">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
             <DetailsSection selected={selected}/>

              {/* PRODUCTS LIST WITH IMAGES FROM COLLECTION */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-primary flex items-center gap-2 italic">
                    <i className="fa-solid fa-cart-shopping"></i> {t("Order Items")}
                  </h3>
                </div>
                {/* order Items */}
                <OrderItems selected={selected}/>
              </div>

              {/* ACTION & SUMMARY BAR */}
              <Summary selected={selected} handleDelete={handleDelete}/>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};




export default Orders;