import Title from '../../Title'

import WorkComponent from './WorkComponent'

const Works = () => {
       
  return (
    <>
      <div className='text-center w-[90%] m-auto flex items-center flex-col '>
        <Title title={"How it Works"} subTitle="  Choose your product and enjoy a simple shopping experience."/>
        <WorkComponent />
        </div>
    </>
  )
}

export default Works
