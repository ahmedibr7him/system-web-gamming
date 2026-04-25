import { useDispatch, useSelector } from "react-redux";
import { assesst } from "../../../../public/assesst";
import { useTranslation } from "react-i18next";
import { selectProductType } from "../../../Dashbourd/Redux/AddCollectionSlice";

const data = [
  { id: 1, label: "All", type:"all"},
  { id: 2, label: "Boy's Collection",type:"boy", img: assesst.imageBoy },
  { id: 3, label: "Girl's Collection",type:"girl", img: assesst.girl },
  { id: 4, label: "Kid's Collection",type:"child", img: assesst.kids },
];

const TypProduct = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeFilter = useSelector(
    state => state.addCollection.activeFilter
  );
  const handleSubmit = async(type) => {
   await dispatch(selectProductType(type));
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSubmit(item.type)}
          className={`flex lg:flex-col items-center justify-center gap-4 shadow-md p-4 rounded-xl transition hover:shadow-lg cursor-pointer ${
            activeFilter === item.type ? "bg-primary text-white" : "bg-bg"
          }`}
        >
          {item.img && (
            <div className="w-20 h-20 bg-white flex items-center justify-center rounded-full shadow-md border-2 border-primary overflow-hidden">
              <img
                src={item.img}
                loading="lazy"
                alt={item.label}
                className="object-contain w-17.5 h-17.5"
              />
            </div>
          )}

          <p className={`text-lg font-medium ${
            activeFilter === item.type ? "text-white" : "text-secondary"
          }`}>
            {t(item.label)}
          </p>
        </div>
      ))}
    </>
  );
};

export default TypProduct;