import Profile from "../component/SignInLogin/Profile";
import Signin from "../component/SignInLogin/Signin"
import { useSelector } from "react-redux"
const SignUp = () => {
  const {user} = useSelector(state=>state.auth);

  return (
    <>
      <section className="w-full min-h-screen bg-bg flex justify-center items-center">
        {!user ? <Signin/> : <Profile/>}
      </section>
    </>
  )
}

export default SignUp