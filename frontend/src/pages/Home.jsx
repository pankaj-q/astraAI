import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import  api  from "../utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import SideArea from "../components/sideArea.jsx";



function Home() {
  const {userData} =useSelector(state=>state.user)
  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserData(data.user ?? data));
      console.log("login respnse",data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);

      const token = await data.user.getIdToken();

      console.log("Firebase Token:", token);

      await handleLogin(token);
      console.log(data);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }
  return (
    <div className="h-screen flex bg-black text-white overflow-hidden">
      <SideArea/>
     
      {!userData && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur">
          <h1>Welcome to AstraAI</h1>

          <p>Please login to continue with Google</p>

          <button
            className="w-full max-w-sm flex items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-100 cursor-pointer"
            onClick={googleLogin}
          >
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
