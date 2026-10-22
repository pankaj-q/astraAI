import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'
import InputMessage from './InputMessage.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, getMessages } from '../pages/redux/messageSlice.js';
import { useEffect } from 'react';



function ChatArea() {
  const{selectedConversation} = useSelector((state) => state.conversations);
  const dispatch= useDispatch();
  useEffect(() => {
      const getMesg = async() => {
        if(selectedConversation){
        const data = getMessages(selectedConversation?._id);
        dispatch(setMessage(data));
      }
    }
    getMesg();
  },[selectedConversation]);
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <MessageList />
      <InputMessage />
    </div>
  );
}

export default ChatArea
