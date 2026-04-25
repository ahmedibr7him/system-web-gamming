

const InfoRow = ({ label, value, color = "text-gray-800" }) => (
  <div className="flex justify-between items-center text-xs font-bold border-b border-gray-50 pb-2">
    <span className="text-secondary font-medium uppercase tracking-tighter">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

export default InfoRow