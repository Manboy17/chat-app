import Chat from "../components/Chat";
import ChatLanding from "../components/ChatLanding";
import UsersSession from "../components/UsersSection";
import { useChat } from "../store/useChat";

const HomePage = () => {
  const { selectedUser } = useChat();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container w-[90vw] h-[90vh] rounded-lg">
        <div className="flex gap-6 h-full">
          <UsersSession />

          {selectedUser ? <Chat /> : <ChatLanding />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
