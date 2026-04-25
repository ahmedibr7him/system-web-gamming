import React, { Suspense, lazy, useEffect } from 'react'; 
import Title from "../Title";
import { useTranslation } from "react-i18next";
import DataContact from "./DataContact";
import LinksContact from "./LinksContact";
import { useDispatch } from 'react-redux';
import { getDataContact } from '../../Dashbourd/Redux/dataContactSlice';
import { getLinkContact } from '../../Dashbourd/Redux/dataLinkContactSlice';


const FormContact = lazy(() => import("./FormContact"));

const ContactItem = () => {
  const { t } = useTranslation();

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getDataContact());
    dispatch(getLinkContact());
  },[dispatch])

  return (
    <div className="flex flex-col gap-12 bg-bg py-20 w-[90%] m-auto">
      
      {/* Title */}
      <div className="flex justify-center items-center py-5 bg-white rounded-2xl shadow-md">
        <Title title={"Contact Us"} subTitle={""}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-white shadow-md rounded-2xl p-5">
        
        {/* Left Side - Form */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl text-primary font-extrabold  uppercase">
              {t("Send A Message")}
            </h3>
            <p className="text-sm text-secondary">
              {t(" We’d love to hear from you. Fill out the form and we’ll get back to you as soon as possible.")}
            </p>
          </div>

          {/*Loading */}
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-gray-400">Loading Form...</div>}>
            <FormContact />
          </Suspense>
        </div>

        {/* Right Side - Contact Info */}
        <div className="bg-primary py-10 rounded-3xl shadow-md flex items-center">
          <div className="w-[90%] m-auto flex flex-col gap-5">
            <p className="font-bold text-xl text-white">
              {t("Hi! We are always here to help you.")}
            </p>
            <DataContact />
            <div className="h-px bg-white/30 rounded-full"></div>

            <div className="flex flex-col gap-3">
              <p className="text-white font-bold">
                {t("Connect With Us :")}
              </p>
              <ul className="flex items-center gap-5">
                <LinksContact />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;