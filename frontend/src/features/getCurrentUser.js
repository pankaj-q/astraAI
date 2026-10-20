import api from "../utils/axios.js"
const getCurrentUser = async() => {
   try {
     const {data} = await api.get('/api/me')
     return data;
   } catch (error) {
   console.log("Status:", error.response?.status);
   console.log("Backend response:", error.response?.data);
   }
}

export default getCurrentUser