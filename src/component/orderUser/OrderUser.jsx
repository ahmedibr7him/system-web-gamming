import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder, GetOrder } from '../../Dashbourd/Redux/orders/OrderSlice';
import { deleteOrderItemsByNumber, GetOrderItem, returnOrderItem } from '../../Dashbourd/Redux/orders/OrderItemSlice';
import { GetCollection, increaseStockAsync } from '../../Dashbourd/Redux/AddCollectionSlice'; 
import NavOrders from './NavOrders';
import { useTranslation } from 'react-i18next';
import ToastReturn from './ToastReturn';
import NumberDateTotal from './NumberDateTotal';
import ButtonReturn from './ButtonReturn';

const OrderUser = () => {
  const dispatch = useDispatch();
  const{t}=useTranslation()
  const { order = [] } = useSelector((state) => state.order || {});
  const { orderItem = [] } = useSelector((state) => state.orderItem || {});
  
  const [returningId, setReturningId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let timer;
    if (returningId && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && returningId) {
      handleFinalReturn(returningId);
    }
    return () => clearInterval(timer);
  }, [returningId, timeLeft]);

const handleFinalReturn = async (orderId) => {
    const targetOrder = order.find(o => o.id === orderId);
    
    if (targetOrder) {
      try {
        await dispatch(returnOrderItem({ orderNumber: targetOrder.order_number })).unwrap();
        const itemsToUpdate = orderItem.filter(item => item.order_num === targetOrder.order_number);
        for (const item of itemsToUpdate) {
          await dispatch(increaseStockAsync({ id: item.product_id, quantity: Number(item.quantity) })).unwrap();
        }

        await dispatch(deleteOrder(orderId)).unwrap();
        await dispatch(deleteOrderItemsByNumber(targetOrder.order_number)).unwrap();
      } catch (error) {
        return error.message
      }
    }
    setReturningId(null);
  };

  const canReturn = (createdAt) => {
    if (!createdAt) return false;
    const orderDate = new Date(createdAt);
    const now = new Date();
    const hoursDiff = (now - orderDate) / (1000 * 60 * 60);
    return hoursDiff <= 24; 
  };

  const requestReturn = (id) => {
    setReturningId(id);
    setTimeLeft(5);
  };

  const undoReturn = () => {
    setReturningId(null);
    setTimeLeft(5);
  };

 useEffect(() => {
  dispatch(GetCollection());
  dispatch(GetOrder());
  dispatch(GetOrderItem());
}, [dispatch]);


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 pt-24 relative">
      {/* return */}
      {returningId && (
       <ToastReturn undoReturn={undoReturn} timeLeft={timeLeft}/>
      )}

      <div className="max-w-5xl mx-auto">
        {/* navbar */}
        <NavOrders order={order} />
        {/* My previous requests */}
        <h2 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
         {t("My previous requests")}
        </h2>

        
        <div className="space-y-6">
          {order.length > 0 ? order.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 
              ${returningId === item.id ? 'opacity-50 grayscale scale-[0.98]' : 'hover:shadow-xl'}`} >
                
              <div className="p-8">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  
                  <NumberDateTotal item={item}/>
                  <ButtonReturn canReturn={canReturn} item={item} requestReturn={requestReturn} returningId={returningId}/>

                </div>
              </div>

              {/* شريط الحالة */}
              <div className="h-2 w-full bg-gray-50 flex">
                <div 
                  className={`h-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)] ${
                    item.status === 'completed' ? 'w-full bg-green-500' : 'w-1/2 bg-yellow-400'
                  }`}
                ></div>
              </div>
            </div>
          )) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold">لا يوجد طلبات حالية</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderUser;