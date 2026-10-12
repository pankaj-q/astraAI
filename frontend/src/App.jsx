import { signInWithPopup } from 'firebase/auth'
// import React from 'react'
import { auth, googleProvider } from './utils/firebase'
import api from './utils/axios.js'

function App() {
  const handleLogin = async(token) => {
    try {
      const {data} = await api.post('/auth/login', token) 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
    
  
  const googleLogin = async() => {
    const token = data.user.getIdToken(token)
    console.log(token)
    await handleLogin(token)
    const data = await signInWithPopup(auth, googleProvider);
    console.log(data);
}
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center min-h-screen">
      <button
        className="w-40 h-20 bg-amber-400 flex items-center justify-center"
        onClick={googleLogin}
      >
        continue with google
      </button>
    </div>
  );
 
}

export default App