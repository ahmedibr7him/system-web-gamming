import { useTranslation } from "react-i18next";
const StatusBadge = ({ status }) => {
  const {t}=useTranslation()
  const config = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    completed: "bg-primary text-white border-primary shadow-sm",
    cancelled:"bg-rose-100 text-rose-700 border-rose-200"
  };
  return (
    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border tracking-tight transition-colors ${config[status] || config.pending}`}>
      {t(status)}
    </span>
  );
};

export default StatusBadge