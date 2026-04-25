import { useDispatch, useSelector } from 'react-redux';
import { deletefeedback } from '../../Redux/ReviewSlice';
import { useTranslation } from 'react-i18next';
import { assesst } from '../../../../public/assesst';
import { showToast } from '../../../Redux/toast/Toast';

const FeedbackComponent = ({ setEdite }) => {
  const { dataFeedback = [] } = useSelector((state) => state.reviewSlice);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleDelete = (item) => {
    if (item) {
      dispatch(deletefeedback(item));
      dispatch(showToast({message:"Deleted successfully" ,type:"error"}))
    }
  };

  return (
    <div className='grid grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2'>
      {dataFeedback.length > 0 ? (
        dataFeedback.slice(0, 12).map((item) => (
          <div 
            key={item.id} 
            className="group relative bg-white rounded-4xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
          >
           
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={item.image || assesst.imageBoy} 
                      alt={item.name_en} 
                      className='rounded-2xl shadow-sm w-12 h-12 object-cover border-2 border-white'
                    />
                    
                    <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${item.active ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-primary truncate max-w-30">
                      {isArabic ? item.name_ar : item.name_en}
                    </h3>
                    <div className='flex gap-0.5 mt-0.5'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i 
                          key={i} 
                          className={`fa-solid fa-star text-[10px] ${i < item.number ? 'text-amber-400' : 'text-gray-200'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <p className="text-xs leading-relaxed text-secondary font-medium line-clamp-3 h-11.25">
              {isArabic ? item.description_ar : item.description_en}
            </p>

            
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50">
              <div className="flex gap-1">
                <button 
                  onClick={() => setEdite(item)} 
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-secondary hover:bg-primary hover:text-white transition-all active:scale-90"
                  title={t("Edit")}
                >
                  <i className="fa-regular fa-pen-to-square text-xs"></i>
                </button>
                
                <button 
                  onClick={() => handleDelete(item)} 
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                  title={t("Delete")}
                >
                  <i className="fa-regular fa-trash-can text-xs"></i>
                </button>
              </div>

              <span className="text-[10px] font-black uppercase text-gray-300 tracking-tighter">
                ID: {item.id.toString().slice(0, 5)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full py-20 text-center">
           <i className="fa-solid fa-inbox text-5xl text-gray-100 mb-4"></i>
           <p className="text-secondary font-bold">{t("No reviews found")}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;