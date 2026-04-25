
import Title from '../../Title'
import OurCollectionItem from './OurCollectionItem'

const OurCollection = () => {
  return (
    <>
    <div className='w-full text-center h-full '>
        <Title title={"Our Collection"}  subTitle={"Explore a wide range of products crafted with care to bring you the best shopping experience."}/>
        <div className='w-full'>
            <OurCollectionItem/>
        </div>

    </div>
      
    </>
  )
}

export default OurCollection
