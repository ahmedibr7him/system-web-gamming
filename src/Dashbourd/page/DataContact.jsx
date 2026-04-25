import { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import Title from '../../component/Title';
import DataMessage from '../component/DataMessage/DataMessage';
import InputDataMessage from '../component/DataMessage/InputDataMessage';
import LinksContact from '../component/DataMessage/LinksContact';
import InputLinkContact from '../component/DataMessage/InputLinkContact';
import { useTranslation } from 'react-i18next';
import { getLinkContact } from '../Redux/dataLinkContactSlice';
import { getDataContact } from '../Redux/dataContactSlice';

const DataContact = () => {
  const{t}=useTranslation();
  const dispatch=useDispatch()
  const { data, loading: dataLoading } = useSelector((state) => state.dataContact);
  const { links, loading: linksLoading } = useSelector((state) => state.linkContact);

  const [edite, setEdite] = useState(null);
  const [editeLink, setEditeLink] = useState(null);

  useEffect(()=>{
    dispatch(getLinkContact());
    dispatch(getDataContact())
  },[dispatch])




  return (
    <div className="p-2 md:p-6 min-h-screen bg-bg transition-all duration-300 mb-20">
      <div className="mb-10 animate-fade-in">
        <Title title={"Communication settings"} subTitle={"Managing contact information and social media links"} />
      </div>

      <div className="grid grid-cols-1 gap-12 max-w-7xl mx-auto">

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
             {t("Basic contact information")}
            </h3>
          </div>
          {dataLoading ? (
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <DataMessage setEdite={setEdite} />
            </div>
          )}
          
          <div className="mt-6 border-t pt-6">
            <InputDataMessage edite={edite} setEdite={setEdite} />
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-8 bg-secondary rounded-full"></span>
             {t("Social media links")}
            </h3>
          </div>

          {linksLoading ? (
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <LinksContact setEditeLink={setEditeLink} />
            </div>
          )}

          <div className="mt-6 border-t pt-6">
            <InputLinkContact editeLink={editeLink} setEditeLink={setEditeLink} />
          </div>
        </section>

      </div>
    </div>
  );
};

export default DataContact;