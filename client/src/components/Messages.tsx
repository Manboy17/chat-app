import {useEffect, useRef, useState} from "react";
import {useChat} from "../store/useChat";
import {getTimestamp} from "../lib/utils";
import useAuth from "../store/useAuth.ts";

const Messages = () => {
    const {user} = useAuth();
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const {
        messages,
        getMessages,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChat();
    const selectedUserId = selectedUser?._id;
    const currentUserId = user?.id;

    const [modalImage, setModalImage] = useState<string | null>(null);

    useEffect(() => {
        getMessages(selectedUserId);

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUserId, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (lastMessageRef.current && messages.length > 0) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages, lastMessageRef]);

    const openModal = (image: string) => {
        setModalImage(image);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div
            className="flex-1 overflow-y-auto overflow-hidden no-scrollbar p-4 space-y-4 rounded-lg relative">
            {messages.length === 0 ? (
                <p className="pt-10 text-center text-gray-500">No messages yet</p>
            ) : (
                messages.map((m) => (
                    <div
                        key={m._id + m.createdAt}
                        ref={lastMessageRef}
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
                                    className="w-full mb-2 rounded-lg cursor-pointer"
                                    onClick={() => openModal(m.image as string)}
                                />
                            )}
                            {m.content && <p>{m.content}</p>}
                            <span className="text-xs mt-2 block">
                {getTimestamp(m.createdAt)}
              </span>
                        </div>
                    </div>
                ))
            )}

            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative">
                        <img
                            src={modalImage}
                            alt="Enlarged content"
                            className="max-w-full max-h-screen rounded-lg"
                        />
                        <button
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
