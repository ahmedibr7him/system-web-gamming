import { updateOrderStatus } from '../../Redux/orders/OrderSlice'
import { useDispatch } from 'react-redux'
import ActionBtn from './ActionBtn'
import { useTranslation } from 'react-i18next'
import { showToast } from '../../../Redux/toast/Toast'
const Summary = ({selected,handleDelete}) => {
    const dispatch =useDispatch()
    const {t}=useTranslation();
  return (
    <>
    <div className="lg:col-span-3 flex flex-wrap items-center justify-between gap-6 mt-4 bg-primary rounded-4xl p-6 shadow-xl shadow-primary/20">
                <div className="text-white">
                  <p className="text-2xl font-black italic tracking-tighter">${selected.total_price}</p>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{t("Total Transaction Value")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ActionBtn label="Confirm" icon="fa-check" color="bg-green-500" onClick={() => {dispatch(updateOrderStatus({ id: selected.id, status: 'completed' }));dispatch(showToast({message:"completed",type:"success"}))}} />
                  <ActionBtn label="pending" icon="fa-clock" color="bg-amber-500" onClick={() => {dispatch(updateOrderStatus({ id: selected.id, status: 'pending' }));dispatch(showToast({message:"pending",type:"error"}))}} />
                  <ActionBtn label="Cancel" icon="fa-trash" color="bg-red-500" onClick={() =>{ handleDelete(selected.id, selected.order_number);dispatch(showToast({message:"Deleted successfully",type:"error"}))}} />
                </div>
              </div>
    </>
  )
}

export default Summary
