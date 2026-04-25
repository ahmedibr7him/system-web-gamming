import Title from '../Title';
import { assesst } from '../../../public/assesst';
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import supabase from '../../supabase/supabase';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getGuestId } from '../../Dashbourd/Redux/orders/OrderLocalSlice';
import { AddOrder } from '../../Dashbourd/Redux/orders/OrderSlice';
import { AddOrderItem } from '../../Dashbourd/Redux/orders/OrderItemSlice';
import { decreaseStockAsync, GetCollection } from '../../Dashbourd/Redux/AddCollectionSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../Redux/toast/Toast';

const ConfirmData = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // States
    const [phone, setPhone] = useState("");
    const [governorate, setGovernorate] = useState("");
    const [city, setCity] = useState("");
    const [payment, setPayment] = useState("cash"); 

    const locationData = {
        Cairo: ["Nasr City", "Maadi", "Heliopolis", "New Cairo"],
        Giza: ["Dokki", "Mohandessin", "Haram", "Sheikh Zayed"],
        Alexandria: ["Smouha", "Stanley", "Miami", "Gleem"],
        Dakahlia: ["Mansoura", "Talkha", "Mit Ghamr"],
        Sharqia: ["Zagazig", "10th of Ramadan", "Belbeis"],
    };

    // Data from Redux
    const { cart } = useSelector((state) => state.cart);
    const { collection } = useSelector(state => state.addCollection);
    const {i18n}=useTranslation();
    const navigate=useNavigate()
    const product = useMemo(() => {
        return cart.map((c) => {
            const items = collection.find((item) => item.id === c.id);
            if (!items) return null;
            return { ...items, quantity: c.quantity, color: c.color };
        }).filter(Boolean);
    }, [cart, collection]);

    const Total = product.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const full_name = useRef(null);
    const email = useRef(null);
    const detailsaddress = useRef(null);
    const send_message = useRef(null);

    const generateOrderNum = () => Math.floor(Math.random() * 100000);

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (product.length === 0) {
            return;
        }

        try {
            const { data: userData } = await supabase.auth.getUser();
            const user = userData?.user;
            const order_number = generateOrderNum();
            const guestId = getGuestId();

           
            const order = {
                order_number: order_number,
                order_id: guestId,
                user_id: user ? user.id : null,
                total_price: Total,
                status: "pending"
            };
            
          
            await Promise.all(
                product.map(item => dispatch(decreaseStockAsync({ id: item.id, quantity: item.quantity })).unwrap())
            );

            await dispatch(AddOrder(order)).unwrap();

            
            const order_items = product.map(item => ({
                order_num: order_number,
                product_id: item.id,
                quantity: item.quantity,
                color: item.color,
                order_id: guestId,
                full_name: full_name.current.value,
                email: email.current.value,
                phone_number: phone,
                governorate: governorate,
                city: city,
                detailsaddress: detailsaddress.current.value,
                payment: payment,
                send_message: send_message.current?.value || "",
                return: "none",
                type: "online",
            }));

            await dispatch(AddOrderItem(order_items)).unwrap();
            dispatch(showToast({
                message: "Your order has been reserved, please follow up",
                type: "success"
            }));
            
             dispatch(clearCart());
                 
            await dispatch(GetCollection());
            
            if (full_name.current) full_name.current.value = "";
if (email.current) email.current.value = "";
if (detailsaddress.current) detailsaddress.current.value = "";
if (send_message.current) send_message.current.value = "";

setPhone("");
setGovernorate("");
setCity("");
setPayment("cash");

 setTimeout(() => {
    navigate(`/order/${i18n.language}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}, 100);
            
                       
      

        } catch (error) {
            console.error("Order process error:", error);
            await dispatch(showToast({
                message:"An error occurred in your order. Please contact customer service.",
                type:"error"
            }))
           return error.message
        }
    };

    

    return (
        <section className='bg-bg w-full min-h-screen flex justify-center items-center py-20'>
            <div className='lg:w-[60%] w-[90%] bg-white h-full rounded-2xl shadow-md p-8 '>
                <div className='w-full text-center py-5'>
                    <Title title={t("Shipping details")} subTitle={""} />
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="FullName" className="text-primary font-bold">{t("Full Name *")}</label>
                        <input type="text" required id="FullName" ref={full_name} placeholder={t("Full Name...")} className="bg-bg px-3 py-2 rounded-full shadow-md focus:shadow-primary outline-none text-secondary transition-all" />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-primary font-bold">{t("Email *")}</label>
                        <input type="email" ref={email} required id="email" placeholder={t("Email...")} className="bg-bg px-3 py-2 rounded-full shadow-md focus:shadow-primary outline-none text-secondary transition-all" />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <label className="text-primary font-bold">{t("Phone Number *")}</label>
                        <PhoneInput
                            value={phone}
                            onChange={setPhone}
                            international
                            defaultCountry="EG"
                            countryCallingCodeEditable={false}
                            required
                            className="bg-bg px-3 text-secondary py-2 rounded-full shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-primary [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:w-full"
                        />
                    </div>

                    {/* Governorate */}
                    <div className="flex flex-col gap-1">
                        <label className="text-primary font-bold">{t("Governorate *")}</label>
                        <select required value={governorate} onChange={(e) => { setGovernorate(e.target.value); setCity(""); }} className="bg-bg px-3 py-2 rounded-full shadow-md focus:shadow-primary outline-none text-secondary transition-all">
                            <option value="">{t("Select Governorate")}</option>
                            {Object.keys(locationData).map((gov) => <option key={gov} value={gov}>{gov}</option>)}
                        </select>
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-1">
                        <label className="text-primary font-bold">{t("City *")}</label>
                        <select required disabled={!governorate} value={city} onChange={(e) => setCity(e.target.value)} className="bg-bg px-3 py-2 rounded-full shadow-md focus:shadow-primary outline-none text-secondary transition-all disabled:opacity-50">
                            <option value="">{t("Select City")}</option>
                            {governorate && locationData[governorate].map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Detailed Address */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="detailsAddress" className="text-primary font-bold">{t("Detailed address *")}</label>
                        <input type="text" ref={detailsaddress} required id="detailsAddress" placeholder={t("Enter Details Address")} className="bg-bg px-3 py-2 rounded-full shadow-md focus:shadow-primary outline-none text-secondary transition-all" />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1 lg:col-span-2">
                        <label htmlFor="message" className="text-primary font-bold">{t("Send Message")}</label>
                        <textarea ref={send_message} id="message" placeholder={t("Enter your Message...")} className="bg-bg px-3 py-2 rounded-lg shadow-md focus:shadow-primary outline-none text-secondary transition-all" rows="4" />
                    </div>

                    {/* Payment Options */}
                    <div className='w-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className={`p-4 border-2 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${payment === 'cash' ? 'border-primary bg-white' : 'border-transparent bg-bg'}`}>
                            <input type="radio" id='cash' name='payment' value="cash" checked={payment === 'cash'} onChange={(e) => setPayment(e.target.value)} className='accent-primary' />
                            <label htmlFor="cash" className='flex-1 cursor-pointer'>
                                <p className='font-semibold text-primary'>{t("Payment upon receipt")}</p>
                                <span className='text-[10px] text-secondary block'>{t("Pay cash upon delivery")}</span>
                            </label>
                            <i className="fa-solid fa-dollar-sign text-primary bg-white p-2 rounded-full shadow-sm"></i>
                        </div>

                        <div className={`p-4 border-2 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${payment === 'online' ? 'border-primary bg-white' : 'border-transparent bg-bg'}`}>
                            <input type="radio" id='online' name='payment' value="online" checked={payment === 'online'} onChange={(e) => setPayment(e.target.value)} className='accent-primary' />
                            <label htmlFor="online" className='flex-1 cursor-pointer'>
                                <p className='font-semibold text-primary'>{t("Electronic payment")}</p>
                                <div className='flex gap-1 mt-1'>
                                    <img src={assesst.vodafone} alt="vodafone" className='h-6 w-auto' />
                                    <img src={assesst.visa} alt="visa" className='h-6 w-auto' />
                                </div>
                            </label>
                            <i className="fa-regular fa-credit-card text-primary bg-white p-2 rounded-full shadow-sm"></i>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-end items-center lg:col-span-2">
                        <button type="submit" aria-label='Confirm Order'   className="w-full lg:w-auto rounded-2xl px-8 py-3 bg-primary text-white font-bold shadow-md hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all duration-300">
                            {t("Confirm Order")}
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ConfirmData;