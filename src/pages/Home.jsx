import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";


import { GetCollection } from "../Dashbourd/Redux/AddCollectionSlice";
import { getAbout } from "../Dashbourd/Redux/TitleAndNumberSLice";
import { getTitleAndDescriptionChoose } from "../Dashbourd/Redux/TitleAndDescriptionChoose";
import { getHowItWork } from "../Dashbourd/Redux/HowItWork";
import { getfeedback } from "../Dashbourd/Redux/ReviewSlice";


import HeroPages from "../component/Home/Hero/HeroPages";
import OurCollection from "../component/Home/OurCollection/OurCollection";


const FeauterProduct = lazy(() => import("../component/Home/FeauterProduct/FeauterProduct"));
const AboutCountaint = lazy(() => import("../component/Home/About/AboutCountaint"));
const Works = lazy(() => import("../component/Home/Works/Works"));
const FeedBack = lazy(() => import("../component/Home/Feedback/FeedBack"));

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(GetCollection());
    dispatch(getAbout());
    dispatch(getTitleAndDescriptionChoose());
    dispatch(getHowItWork());
    dispatch(getfeedback());
  }, [dispatch]);

  return (
    <div className="relative w-full gap-20 bg-bg flex flex-col items-center overflow-hidden">
     
      <HeroPages />
      <OurCollection />

     
      <Suspense fallback={<div className="h-20 w-full animate-pulse bg-gray-100" />}>
        <FeauterProduct />
        <AboutCountaint />
        <Works />
        <FeedBack />
      </Suspense>
    </div>
  );
};

export default Home;