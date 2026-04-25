import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { deleteMessage, editMessage } from "../../Redux/MessageSlice";
import { useTranslation } from "react-i18next";
import { showToast } from "../../../Redux/toast/Toast";

const TableMessage = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data_filter } = useSelector((state) => state.dataMessage);
  const [openId, setOpenId] = useState(null);
  const dispatch = useDispatch();

  const handleRowClick = (user) => {
    const isOpening = openId !== user.id;
    setOpenId(isOpening ? user.id : null);

    if (isOpening && !user.isread) {
      dispatch(editMessage(user.id));
    }
  };

  return (
    <section className="overflow-x-auto">
      <table className="w-full text-start border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50/80 text-secondary uppercase text-[11px] font-bold tracking-widest text-start">
            <th className="p-6 border-b">{t("Sender")}</th>
            <th className="p-6 border-b">{t("Date")}</th>
            <th className="p-6 border-b text-center">{t("Status")}</th>
            <th className="p-6 border-b text-center">{t("Actions")}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {data_filter?.map((user) => (
            <Fragment key={user.id}>
              <tr
                onClick={() => handleRowClick(user)}
                className={`group cursor-pointer transition-all hover:bg-primary/2 ${
                  !user.isread ? "bg-primary/1" : ""
                }`}
              >
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    {!user.isread && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    )}
                    <span className={`text-sm ${!user.isread ? "font-black text-gray-900" : "font-medium text-gray-600"}`}>
                      {user.first_name} {user.secound_name}
                    </span>
                  </div>
                </td>

                <td className="p-6 text-xs font-bold text-secondary italic">
                  {new Date(user.date).toLocaleDateString(isArabic ? "ar-EG" : "en-CA")}
                </td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border
                    ${user.isread 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-amber-50 text-amber-600 border-amber-100"}`}
                  >
                    {user.isread ? t("Read") : t("Unread")}
                  </span>
                </td>

                <td className="p-6 text-center">
                   <div className="flex items-center justify-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openId === user.id ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                        <i className="fa-solid fa-chevron-down text-[10px]"></i>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                           dispatch(deleteMessage(user.id));
                           dispatch(showToast({message:"تم الحذف بنجاح" ,type:"error"}))
                        }}
                        className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                      >
                        <i className="fa-regular fa-trash-can text-xs"></i>
                      </button>
                   </div>
                </td>
              </tr>

              {openId === user.id && (
                <tr className="bg-gray-50/50">
                  <td colSpan="4" className="p-8 border-b border-gray-100">
                    <div className="bg-white rounded-4xl shadow-sm border border-gray-100 p-8 animate-slideDown">
                      <div className="flex flex-col md:flex-row justify-between gap-8">
                        
                        <div className="flex-1 space-y-4">
                          <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6 border-b pb-2 flex items-center gap-2">
                            <i className="fa-solid fa-circle-info"></i> {t("Message Details")}
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DetailItem label={t("Full Name")} value={`${user.first_name} ${user.secound_name}`} />
                            <DetailItem label={t("Email")} value={user.email} isLink href={`mailto:${user.email}`} />
                            <DetailItem label={t("Phone")} value={user.phone_number} />
                            <DetailItem label={t("Received Date")} value={user.date} />
                          </div>
                        </div>

                        {/* محتوى الرسالة */}
                        <div className="flex-[1.5] bg-gray-50 rounded-2xl p-6 relative">
                          <i className="fa-solid fa-quote-left absolute top-4 left-4 text-gray-200 text-3xl"></i>
                          <h4 className="text-[10px] font-black text-secondary uppercase mb-3 relative z-10">{t("Message Content")}</h4>
                          <p className="text-sm leading-relaxed text-gray-700 font-medium relative z-10">
                            {user.message}
                          </p>
                          
                          <div className="mt-8 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const subject = encodeURIComponent("Reply to your message");
                                const body = encodeURIComponent(`Hello ${user.first_name},\n\nThank you for contacting us.\n\nBest regards,\nSupport Team`);
                                window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
                              }}
                              className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
                            >
                              <i className="fa-solid fa-paper-plane"></i>
                              {t("Reply via Email")}
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};


const DetailItem = ({ label, value, isLink, href }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-black text-gray-400 uppercase">{label}</span>
    {isLink ? (
      <a href={href} className="text-sm font-bold text-primary hover:underline">{value}</a>
    ) : (
      <span className="text-sm font-bold text-gray-700">{value}</span>
    )}
  </div>
);

export default TableMessage;