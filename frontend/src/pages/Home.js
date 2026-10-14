import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import { api } from "../utils/axios.js";

function Home() {
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token });
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
    <div className ="h-scree flex bg-black text-white">
        <h1 >Welcome to AstraAI</h1>
        <p>Please login to continue in the app</p>
      <button className="w-full flex items-center justify-center gap-3 rounded-xl text-sm font-medium text-black/90 bhg-white hover:bg -gray-200 transition-all duration-1s cursor-pointer" onClick={googleLogin}>Continue with Google</button>
    </div>
  );
}

export default Home;
