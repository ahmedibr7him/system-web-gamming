
import { useTranslation } from "react-i18next"
import InfoRow from "./InfoRow"
import DetailCard from "./DetailCard"
const DetailsSection = ({selected}) => {
    const{t}=useTranslation()
  return (
    <>
       <DetailCard title={t("Customer Profile" )} icon="fa-user-astronaut">
                <div className="space-y-3">
                  <InfoRow label={t("Name")} value={selected.customer.name} />
                  <InfoRow label={t("Phone")} value={selected.customer.phone} />
                  <InfoRow label={t("Payment")} value={selected.logistics.payment} color="text-green-600" />
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[10px] uppercase font-bold text-secondary mb-1 tracking-widest">{t("Shipping Address")}</p>
                    <p className="text-xs leading-relaxed text-gray-600 italic">
                      <i className="fa-solid fa-location-dot mr-2 text-primary"></i>
                      {selected.customer.address} - {selected.customer.details}
                    </p>
                  </div>
                </div>
              </DetailCard>
    </>
  )
}

export default DetailsSection
