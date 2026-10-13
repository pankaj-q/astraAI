
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './utils/firebase'
import api from './utils/axios.js'

function App() {
    const handleLogin = async(token)=>{
     const {data} = await api.post("/auth/login", token);
     console.log(data);
      }
    
   const googleLogin = async() => {
       const data = await signInWithPopup(auth,googleProvider)
       const token = data.user.getIdToken;
       console.log(token);
       await handleLogin(token)
       console.log(data);
   }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center min-h-screen">
        <button
          className="w-40 h-20 bg-amber-400 flex items-center justify-center disabled:opacity-50"
          onClick={googleLogin}>Continue with Google
        </button>
    </div>
  );
}


export default App
