import React from 'react'
import { useTranslation } from 'react-i18next';

const TogglesGroup = ({flags,setFlags ,latestCount,ourBestSeller}) => {
    const {t}=useTranslation()
  return (
    <>
    <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-6 bg-bg/20 p-4 rounded-2xl">
          <Toggle label={t("Active")} checked={flags.active} onChange={() => setFlags(p => ({ ...p, active: !p.active }))} />
          <Toggle label={t("Boy")} checked={flags.boy} onChange={() => setFlags(p => ({ ...p, boy: !p.boy }))} />
          <Toggle label={t("girl")} checked={flags.girl} onChange={() => setFlags(p => ({ ...p, girl: !p.girl }))} />
          <Toggle label={t("child")} checked={flags.child} onChange={() => setFlags(p => ({ ...p, child: !p.child }))} />
          <Toggle 
            label={t("latest")} 
            checked={flags.latest_collection} 
            disabled={latestCount >= 5 && !flags.latest_collection}
            onChange={() => setFlags(p => ({ ...p, latest_collection: !p.latest_collection }))} 
          />
          <Toggle 
            label={t("best seller")} 
            checked={flags.our_best_seller} 
            disabled={ourBestSeller >= 5 && !flags.our_best_seller}
            onChange={() => setFlags(p => ({ ...p, our_best_seller: !p.our_best_seller }))} 
          />
        </div>
    </>
  )
}

// Reusable Toggle Component
const Toggle = ({ label, checked, onChange, disabled }) => (
  <div className={`flex items-center gap-3 ${disabled ? 'opacity-50' : ''}`}>
    <label className="relative inline-block w-10 h-5 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" />
      <span className="absolute inset-0 bg-gray-300 rounded-full transition peer-checked:bg-primary"></span>
      <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></span>
    </label>
    <span className="text-xs font-bold text-secondary uppercase">{label}</span>
  </div>
);

export default TogglesGroup
