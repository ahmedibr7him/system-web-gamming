import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLinkContact } from '../../Redux/dataLinkContactSlice';
import { showToast } from '../../../Redux/toast/Toast';

const LinksContact = ({ setEditeLink }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();


  const { data, loading } = useSelector((state) => state.linkContact);

  const handleDelete = (id) => {
    if (window.confirm(t("Are you sure you want to delete this social link?"))) {
      dispatch(deleteLinkContact(id))
        .unwrap()
      dispatch(showToast({message:"Deleted successfully",type:"error"}))
    }
  };

  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <i className="fa-solid fa-link-slash text-gray-300 text-3xl mb-3"></i>
        <p className="text-gray-500">{t("No social links added yet")}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl text-secondary flex items-center gap-2">
          <i className="fa-solid fa-share-nodes text-primary"></i>
          {t('Social Media Links')}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50/50 text-primary border-b border-gray-100">
                <th className="p-4 w-16">#</th>
                <th className="p-4">{t('Platform')}</th>
                <th className="p-4">{t('Link / URL')}</th>
                <th className="p-4 text-center">{t('Actions')}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {data?.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="p-4 text-gray-400 font-mono">{index + 1}</td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:scale-110 transition-transform shadow-sm">
                        <i className={`fa-brands ${item.icone} text-lg`}></i>
                      </div>
                      <span className="font-semibold capitalize text-secondary">
                        {item.icone.split('-').pop()}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 max-w-50 truncate"
                    >
                      {item.link}
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                      aria-label='edite'
                        onClick={() => {
                          setEditeLink(item);
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-lg text-secondary hover:bg-secondary/10 transition-colors"
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
    </div>
  );
};

export default LinksContact;