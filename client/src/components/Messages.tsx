import { useEffect } from "react";
import { useChat } from "../store/useChat";
import { getTimestamp } from "../lib/utils";
import useAuth from "../store/useAuth.ts";

const Messages = () => {
  const {user} = useAuth();
  const { messages, getMessages, selectedUser } = useChat();
  const selectedUserId = selectedUser?._id;
  const currentUserId = user?.id;

  useEffect(() => {
    getMessages(selectedUserId);
  }, [selectedUserId, getMessages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-hidden no-scrollbar p-4 space-y-4 bg-gray-100 rounded-lg shadow-inner relative">
      {messages.length === 0 ? (
        <p className="pt-10 text-center text-gray-500">No messages yet</p>
      ) : (
        messages.map((m) => (
          <div
            key={m._id + m.createdAt}
            className={`flex ${
              m.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow-lg ${
                m.senderId === currentUserId
                  ? "bg-white text-black"
                  : "bg-blue-500 border text-white border-gray-300"
              }`}
            >
              {m.image && (
                <img
                  src={m.image}
                  alt="Sent content"
                  className="w-full mb-2 rounded-lg"
                />
              )}
              {m.content && <p>{m.content}</p>}
              <span className="text-xs mt-2 block">
                {getTimestamp((m.createdAt))}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
