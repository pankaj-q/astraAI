import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from './utils/firebase'

function App() {
  const googleLogin = async() => {
    const data = await signInWithPopup(auth, googleProvider);
    console.log(data);
}
  return (
    <div className ='w-full h-screen bg-black'>
     <button className='w-5xl h-screen bg-amber-400' onClick={googleLogin}>
      continue with google
     </button>
  </div>
    
  )
}

export default App