import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import  api  from "../utils/axios.js";

function Home() {
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      console.log(data);
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
      if(!userData &&{" "}
      <div className="fix inset-0 z-50 flex item-center justify-center bg-black/60 blackdrop-blur ">
        <h1>Welcome to AstraAI</h1>
        <p>Please login to continue with google</p>
        <button
          className="w-full flex items-center justify-center gap-3 rounded-xl text-sm font-medium text-black/90 bhg-white hover:bg -gray-200 transition-all duration-1s cursor-pointer"
          onClick={googleLogin}
        >
          Continue with Googl
        </button>
      </div>{" "}
      )
    </div>
  );
}

export default Home;
