import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { addLinkContact, editeLinkContact } from "../../Redux/dataLinkContactSlice";
import { showToast } from "../../../Redux/toast/Toast";

const InputLinkContact = ({ editeLink, setEditeLink }) => {
  const icone = useRef(null);
  const link = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.linkContact);
  const [localLoading, setLocalLoading] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handelSubmite = async (e) => {
    e.preventDefault();
    setLocalLoading(true);

    const clean = (value) => value.trim();
    const formData = {
      icone: clean(icone.current.value),
      link: clean(link.current.value),
    };

    if (!formData.icone || !formData.link) {
      setLocalLoading(false);
      return;
    }

    if (!isValidUrl(formData.link)) {
      setLocalLoading(false);
      return;
    }

    try {
      if (editeLink) {
        await dispatch(editeLinkContact({ id: editeLink.id, ...formData })).unwrap();
        setEditeLink(null);
        await dispatch(showToast({message:"Modified successfully",type:"success"}))
      } else {
        await dispatch(addLinkContact(formData)).unwrap();
        await dispatch(showToast({message:"Added successfully",type:"success"}))
      }

      e.target.reset();
    } catch (error) {
        return error
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    if (editeLink) {
      icone.current.value = editeLink.icone || "";
      link.current.value = editeLink.link || "";
      link.current.focus();
    }
  }, [editeLink]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 mt-10 animate-fade-in">
      <form onSubmit={handelSubmite} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Icon Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="link_icone" className="font-bold text-primary text-sm px-1">
            {t("Brand Icon (e.g. fa-facebook) :")}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <i className="fa-solid fa-icons"></i>
            </span>
            <input
              type="text"
              ref={icone}
              id="link_icone"
              required
              placeholder="fa-brands fa-linkedin"
              className="w-full p-3 pl-10 outline-none text-secondary bg-gray-50 border border-transparent focus:border-primary transition-all shadow-inner rounded-xl"
            />
          </div>
        </div>

        {/* URL Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="link_url" className="font-bold text-primary text-sm px-1">
            {t("Social Media URL :")}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <i className="fa-solid fa-link"></i>
            </span>
            <input
              type="text"
              ref={link}
              id="link_url"
              required
              placeholder="https://example.com"
              className="w-full p-3 pl-10 outline-none text-secondary bg-gray-50 border border-transparent focus:border-primary transition-all shadow-inner rounded-xl font-mono text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end items-center gap-3 mt-2">
          {editeLink && (
            <button
            aria-label="edite"
              type="button"
              onClick={() => {
                setEditeLink(null);
                icone.current.value = "";
                link.current.value = "";
              }}
              className="px-6 py-2 rounded-xl text-gray-400 hover:text-red-500 transition-colors font-bold"
            >
              {t("Cancel")}
            </button>
          )}

          <button
          aria-label="delete"
            type="submit"
            disabled={localLoading || loading}
            className={`min-w-37.5 h-12 rounded-xl transition-all duration-300 font-bold shadow-md flex items-center justify-center
              ${(localLoading || loading)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary text-white hover:bg-secondary hover:shadow-lg active:scale-95"}`}
          >
            {localLoading || loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : editeLink ? (
              t("Update Link")
            ) : (
              t("Add New Link")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputLinkContact;