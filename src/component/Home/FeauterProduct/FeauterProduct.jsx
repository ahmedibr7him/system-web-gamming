import { useTranslation } from 'react-i18next';
import Title from '../../Title.jsx'
import LastestCollection from '../FeauterProduct/LastestCollection.jsx'
import OurSellers from '../FeauterProduct/OurSellers.jsx';

const FeauterProduct = () => {


  const {i18n} =useTranslation()
  return (
    <>
      <div className='text-center  w-[90%]  m-auto ' dir={i18n.language === "ar" ? "Ltr":"Ltr" }>
        <Title title="Explore Our Latest Collection" subTitle="Explore our latest collection and discover what’s new"/>
        {/* LastestCollectionItem */}
          <LastestCollection/>

          {/* OurSellersItem */}
       
          <OurSellers/>
      </div>
    </>
  )
}

export default FeauterProduct
