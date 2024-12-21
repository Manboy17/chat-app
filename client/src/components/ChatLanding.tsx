import landing from "../assets/landing.jpg";

const ChatLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow w-full lg:w-3/4 p-4 rounded-lg relative">
      <h1 className="text-center text-sm md:text-lg font-semibold">
        Start chatting with customers, people anytime, anywhere with Chatify
      </h1>
      <div className="w-full flex items-center justify-center mt-10">
        <img src={landing} alt="landing-image" className="w-[600px] h-auto" />
      </div>
    </div>
  );
};

export default ChatLanding;
