
import DataOurCollection from "./DataOurCollection"
const OurCollectionItem = () => {
       
  return (
    <>
    <section className="w-[90%] max-w-350` m-auto my-15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto items-stretch">
        <DataOurCollection/>
    </div>
    </section>
    </>
  )
}

export default OurCollectionItem
