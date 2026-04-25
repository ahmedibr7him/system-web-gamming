import { useEffect } from "react"
import FilterProduct from "../component/product/filterProduct/FilterProduct"
import { useDispatch } from "react-redux"
import { GetCollection } from "../Dashbourd/Redux/AddCollectionSlice"
const Product = () => {
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(GetCollection())
  },[dispatch])
  return (
    <>
    <div className="min-h-screen bg-bg overflow-x-hidden">
      <FilterProduct/>
    </div>
    </>
  )
}

export default Product
