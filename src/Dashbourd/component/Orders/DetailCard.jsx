

const DetailCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <h3 className="font-black text-primary mb-6 flex items-center gap-3 italic">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-primary italic">
        <i className={`fa-solid ${icon} text-sm`}></i>
      </div>
      {title}
    </h3>
    {children}
  </div>
);

export default DetailCard
