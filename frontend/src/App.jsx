import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import getCurrentUser from "./features/getCurrentUser.js";
import { setUserData } from "./redux/userSlice.js";
import {useDispatch} from 'react-redux'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      dispatch(setUserData(data))
    };
    getUser();
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
