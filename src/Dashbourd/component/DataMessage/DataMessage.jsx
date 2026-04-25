import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDataContact } from '../../Redux/dataContactSlice';
import { showToast } from '../../../Redux/toast/Toast';

const DataMessage = ({ setEdite }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.dataContact);

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteDataContact(id)).unwrap()
      dispatch(showToast({message:"تم الحذف بنجاح",type:"error"}))
    }
  };


  if (!loading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <i className="fa-solid fa-address-book text-gray-300 text-2xl"></i>
        </div>
        <p className="text-secondary font-medium">{t("No contact information found")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* Header */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-bold text-primary w-16">#</th>
              <th className="p-4 font-bold text-primary">{t('Contact Type')}</th>
              <th className="p-4 font-bold text-primary">{t('Value')}</th>
              <th className="p-4 font-bold text-primary text-center">{t('Actions')}</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-blue-50/30 transition-colors duration-200 group"
              >
                {/* ID - Better UX: Show row number or ID */}
                <td className="p-4 text-gray-400 font-mono text-xs">
                  {index + 1}
                </td>

                {/* Contact Type with Icon */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <i className={`fa-solid  ${item.icone}`}></i>
                    </div>
                    <span className="font-semibold text-secondary">
                      {isArabic ? item.title_ar : item.title_en}
                    </span>
                  </div>
                </td>

                {/* Contact Value */}
                <td className="p-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-secondary font-medium">
                    {item.contact}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                    aria-label='edite'
                      onClick={() => {
                        setEdite(item);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                      title={t("Edit")}
                    >
                      <i className="fa-regular fa-pen-to-square text-lg"></i>
                    </button>
                    
                    <button 
                    aria-label='delete'
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title={t("Delete")}
                    >
                      <i className="fa-regular fa-trash-can text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataMessage;