import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GetHelp = () => {
  const { t } = useTranslation();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const contactMethods = [
    {
      icon: "fa-solid fa-phone",
      title: "Phone Support",
      detail: "+20 1550165755",
      color: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-envelope",
      title: "Email Us",
      detail: "ahmedibrahim5112004@gmail.com",
      color: "bg-red-500",
    },
    {
      icon: "fa-brands fa-whatsapp",
      title: "WhatsApp",
      detail: "01550165755",
      color: "bg-green-500",
    }
  ];

  return (
    <div className="min-h-screen bg-bg py-20 px-4 md:px-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-black text-primary mb-4"
        >
          {t("How can we help you?")}
        </motion.h1>
        <p className="text-secondary/70 font-medium">{t("We are here to answer your questions and help you with your needs.")}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Cards */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {contactMethods.map((method, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`${method.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                <i className={method.icon}></i>
              </div>
              <div>
                <h3 className="font-bold text-primary">{t(method.title)}</h3>
                <p className="text-secondary text-sm">{method.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-white"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">{t("Send us a Message")}</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">{t("Full Name")}</label>
              <input type="text" placeholder="Full Name" className="bg-bg p-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">{t("Email Address")}</label>
              <input type="email" placeholder="example@mail.com" className="bg-bg p-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-secondary">{t("Subject")}</label>
              <input type="text" placeholder={t("How can we help?")} className="bg-bg p-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-secondary">{t("Message")}</label>
              <textarea rows="4" placeholder={t("Write your message here...")} className="bg-bg p-3 rounded-xl outline-none border border-transparent focus:border-primary transition-all resize-none"></textarea>
            </div>
            <button className="md:col-span-2 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95">
              {t("Submit Request")} <i className="fa-solid fa-paper-plane ml-2"></i>
            </button>
          </form>
        </motion.div>
      </div>

      {/* FAQ Preview Section */}
      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-primary mb-8">{t("Frequently Asked Questions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {[1, 2, 3, 4].map((q) => (
            <div key={q} className="bg-white/50 p-4 rounded-xl border border-gray-100">
              <h4 className="font-bold text-primary text-sm mb-2">{t("Q: Is my data secure?")}</h4>
              <p className="text-secondary/70 text-xs leading-relaxed">{t("Yes, we use industry-standard encryption to protect all your personal and payment information.")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetHelp;