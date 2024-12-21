import Chat from "../components/Chat";
import UsersSession from "../components/UsersSection";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container w-[90vw] h-[90vh] rounded-lg">
        <div className="flex gap-6 h-full">
          <UsersSession />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
