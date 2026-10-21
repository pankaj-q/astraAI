import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'
import InputMessage from './InputMessage.jsx'

function ChatArea() {
  return (
    <div className="flex-1 flex fl">
      <Navbar />
      <MessageList />
      <InputMessage />
    </div>
  );
}

export default ChatArea
