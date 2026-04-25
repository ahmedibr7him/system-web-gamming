import React, { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { addMessage } from "../../Dashbourd/Redux/MessageSlice";
import { showToast } from "../../Redux/toast/Toast";

const FormContact = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  
  const { loading } = useSelector((state) => state.message || {}); 
  const { user } = useSelector((state) => state.auth);
  const formRef = useRef(null);
  const first_name = useRef(null);
  const secound_name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const clean = (value) => value?.trim() || "";

    const inputData = {
      first_name: clean(first_name.current.value),
      secound_name: clean(secound_name.current.value),
      phone_number: phone,
      date: new Date().toISOString(),
      user_id: user?.id,
      message: clean(message.current.value),
      email: clean(email.current.value),
    };
    if (!inputData.first_name || !inputData.email || !phone || !inputData.message) {
      return;
    }

    try {
      await dispatch(addMessage(inputData)).unwrap();
      formRef.current.reset();
      setPhone("");
       dispatch(showToast({
                          message: "Sent successfully", 
                          type: "success"
                        }));
    } catch (error) {
        dispatch(showToast({
                          message: "A transmission error occurred.", 
                          type: "error"
                        }));
      return error.message
    }
  }, [dispatch, phone, user?.id, t]);

  return (
    <form 
      ref={formRef} 
      onSubmit={handleSubmit} 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
    >
      {/* First Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-primary font-extrabold  uppercase text-sm">
          {t("First Name *")}
        </label>
        <input
          type="text"
          required
          ref={first_name}
          id="firstName"
          placeholder={t("First Name...")}
          className="bg-bg px-4 py-3 rounded-xl border border-transparent shadow-sm focus:border-primary focus:bg-white outline-none text-secondary transition-all"
        />
      </div>

      {/* Second Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="secondName" className="text-primary font-extrabold  uppercase text-sm">
          {t("Second Name *")}
        </label>
        <input
          type="text"
          required
          ref={secound_name}
          id="secondName"
          placeholder={t("Second Name...")}
          className="bg-bg px-4 py-3 rounded-xl border border-transparent shadow-sm focus:border-primary focus:bg-white outline-none text-secondary transition-all"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-primary font-extrabold  uppercase text-sm">
          {t("Email *")}
        </label>
        <input
          ref={email}
          type="email"
          required
          id="email"
          placeholder={t("Email...")}
          className="bg-bg px-4 py-3 rounded-xl border border-transparent shadow-sm focus:border-primary focus:bg-white outline-none text-secondary transition-all"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="text-primary font-extrabold  uppercase text-sm">
          {t("Phone Number *")}
        </label>
        <div className="phone-input-container">
          <PhoneInput
            value={phone}
            onChange={setPhone}
            international
            defaultCountry="EG"
            required
            className="bg-bg px-4 py-3 rounded-xl shadow-sm border border-transparent focus-within:border-primary focus-within:bg-white transition-all [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:ml-2 text-secondary"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2 lg:col-span-2">
        <label htmlFor="message" className="text-primary font-extrabold  uppercase text-sm">
          {t("Your Message *")}
        </label>
        <textarea
          id="message"
          required
          ref={message}
          placeholder={t("How can we help you?")}
          className="bg-bg px-4 py-3 rounded-xl border border-transparent shadow-sm focus:border-primary focus:bg-white outline-none text-secondary transition-all resize-none"
          rows="5"
        />
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-end items-center lg:col-span-2">
        <button
          disabled={loading}
          aria-label="Send Message"
          type="submit"
          className="cursor-pointer hover:bg-secondary w-full lg:w-auto min-w-45 group flex items-center justify-center gap-3 rounded-xl px-8 py-4 bg-primary text-white shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="font-bold">{loading ? t("Sending...") : t("Send Message")}</span>
          {!loading && <i className="fa-regular fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>}
        </button>
      </div>
    </form>
  );
};

export default FormContact;