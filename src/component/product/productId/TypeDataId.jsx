import { useTranslation } from 'react-i18next'

const TypeDataId = ({data}) => {
    const {t}=useTranslation()
  return (
    <>
    <div className="flex flex-wrap gap-4 text-secondary font-medium border-b pb-4">
            <span>{t("Release :")} {data.release_year}</span>
            <span>
              {t("Type : ")} ({data.boy && "Boy"} {data.girl && "Girl"} {data.child && "Child"})
            </span>
            <p className={data.active ? "text-green-500" : "text-red-700"}>
              <span className="text-secondary">{t("Store : ")}</span>
              {data.active ? t("Active") : t("Not Active")}
            </p>
          </div>
          </>
  )
}

export default TypeDataId
