import api from '../utils/axios.js'

async function getMessage(id) {
    try {
        const {data} = await api.get(`/api/chat/get-message/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
  
}

export default getMessage