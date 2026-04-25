import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense,useState } from "react";
import supabase from "./supabase/supabase";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Redux/Login/LoginSlice";
import { useTranslation } from "react-i18next";

// Protected Route
import ProtectedRoute from "./pages/ProtectedRoute";
import SplashScreen from "./component/SplashScreen";
import { getfavorite } from "./Redux/favorite/favorte";
import { getGuestId } from "./Dashbourd/Redux/orders/OrderLocalSlice";
import Toast from "./component/toastify/Toast";
import GetHelp from "./Dashbourd/component/GetHelp/GetHelp";

// Layouts (Lazy Loaded)
const LocaleLayout = lazy(() => import("./I18n/LocaleLayOut/LocaleLayOut"));
const LocaleDashbourd = lazy(() => import("./Dashbourd/LocalDashbourd/LocaleDashbourd"));

// Public Pages (Lazy Loaded)
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Contact = lazy(() => import("./pages/Contact"));
const ProductID = lazy(() => import("./component/product/productId/ProductID"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./component/SignInLogin/Login"));
const Favourite = lazy(() => import("./component/Favourite/Favourite"));
const Cart = lazy(() => import("./component/Cart/Cart"));
const ConfirmData = lazy(() => import("./component/Cart/ConfirmData"));
const Profile = lazy(() => import("./component/SignInLogin/profile"));
const OrderUser = lazy(() => import("./component/orderUser/OrderUser"));

// Dashboard Pages (Lazy Loaded)
const Dashbourd = lazy(() => import("./Dashbourd/page/Dashbourd"));
const Categories = lazy(() => import("./Dashbourd/page/Categories"));
const Orders = lazy(() => import("./Dashbourd/page/Orders"));
const Usres = lazy(() => import("./Dashbourd/page/Usres"));
const Reviews = lazy(() => import("./Dashbourd/page/Reviews"));
const Message = lazy(() => import("./Dashbourd/page/Message"));
const About = lazy(() => import("./Dashbourd/page/About"));
const HowItWorks = lazy(() => import("./Dashbourd/page/HowItWorks"));
const DataContact = lazy(() => import("./Dashbourd/page/DataContact"));

const App = () => {
  const dispatch = useDispatch();
   const guestId = getGuestId();
  const { user, loading } = useSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(true);
  const { i18n } = useTranslation();
  const { cart } = useSelector((state) => state.cart);

useEffect(() => {
   
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const user = data.session.user;
        dispatch(setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || "",
          role: user.user_metadata?.role || "user",
        }));
      } else {
        dispatch(setUser(null)); 
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const user = session.user;
        dispatch(setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || "",
          role: user.user_metadata?.role || "user",
        }));
      } else if (event === "SIGNED_OUT") {
        dispatch(setUser(null));
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [dispatch]);

 
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.body.style.fontFamily =
      i18n.language === "ar" ? "var(--font-ar)" : "var(--font-en)";
  }, [i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    dispatch(getfavorite(guestId))
  },[dispatch])

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <>
    <SplashScreen isVisible={showSplash} />
    <Toast/>
      <main className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
         <div className="overflow-x-hidden">
      
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">جاري التحميل...</div>
      }>
        <Routes>
          <Route path="/" element={<Navigate to="/home/en" replace />} />

          {/* Public */}
          <Route path="/" element={<LocaleLayout />}>
            <Route path="home/:lang" element={<Home />} />
            <Route path="product/:id/:lang" element={<ProductID />} />
            <Route path="product/:lang" element={<Product />} />
            <Route path="contact/:lang" element={<Contact />} />
            <Route path="login/:lang" element={user ? <Navigate to="/home/en" /> : <Login />} />
            <Route path="singup/:lang" element={user ? <Navigate to="/home/en" /> : <SignUp />} />
            <Route path="order/:lang" element={<OrderUser />} />
            <Route path="profile/:lang" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="favourite/:lang" element={<Favourite />} />
            <Route path="cart/:lang" element={<Cart />} />
            <Route path="confirm/:lang" element={cart.length > 0 ? <ConfirmData /> : <Cart />} />
          </Route>

          {/* Dashboard */}
          <Route path="/dashbourd/*" element={
            <ProtectedRoute roles={["admin"]}>
              <LocaleDashbourd />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="en" replace />} />
            <Route path=":lang" element={<Dashbourd />} />
            <Route path="categories/:lang" element={<Categories />} />
            <Route path="about/:lang" element={<About />} />
            <Route path="howitwork/:lang" element={<HowItWorks />} />
            <Route path="orders/:lang" element={<Orders />} />
            <Route path="users/:lang" element={<Usres />} />
            <Route path="reviews/:lang" element={<Reviews />} />
            <Route path="message/:lang" element={<Message />} />
            <Route path="datacontact/:lang" element={<DataContact />} />
            <Route path="gethelp/:lang" element={<GetHelp />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
      </main>
    </>
   
  );
};

export default App;