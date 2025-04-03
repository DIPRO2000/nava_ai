import { useState, useEffect } from "react";
import { Send, Menu } from "lucide-react";
import DOMPurify from "dompurify";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Stores chat sessions
  const [selectedChat, setSelectedChat] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const firstName = localStorage.getItem("firstName");

  // ✅ Messages will now properly belong to their session
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello ${firstName}! How can I help you today?`, sender: "bot" }
  ]);

  // ✅ Fetch chat history from backend
  useEffect(() => {
    const fetchChatHistory = async () => {
      const token = localStorage.getItem("Token");

      try {
        const response = await fetch(`${API_BASE_URL}/api/chats/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setChatHistory(data.chats || []); // ✅ Store all chats
        } else {
          console.error("Error fetching chat history:", data.error);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  // ✅ Handle sending messages while keeping session tracking
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const token = localStorage.getItem("Token");

    const newMessage = { id: messages.length + 1, text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chats/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          sessionId: selectedChat?.sessionId || null, // ✅ Send existing session ID or create new
        }),
      });

      const data = await response.json();
      const botMessage = { id: messages.length + 2, text: data.reply, sender: "bot" };

      if (response.ok) {
        setMessages((prev) => [...prev, botMessage]);

        // ✅ Update chat history dynamically
        setChatHistory((prev) => {
          if (selectedChat) {
            return prev.map((chat) =>
              chat.sessionId === selectedChat.sessionId
                ? { ...chat, messages: [...chat.messages, newMessage, botMessage] }
                : chat
            );
          } else {
            // 🔹 If new chat, add it at the top
            return [{ sessionId: data.sessionId, messages: [newMessage, botMessage] }, ...prev];
          }
        });

        if (!selectedChat) {
          setSelectedChat({ sessionId: data.sessionId, messages: [newMessage, botMessage] });
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: "Error: Unable to get response", sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "Error: Network issue", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle selecting a chat from history
  const selectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages || [
      { id: 1, text: `Hello ${firstName}! How can I help you today?`, sender: "bot" }
    ]);
  };

  // ✅ Handle starting a new chat
  const startNewChat = () => {
    setMessages([
      { id: 1, text: `Hello ${firstName}! How can I help you today?`, sender: "bot" }
    ]);
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen">
      {/* Chat History Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 hidden md:block">
        <h2 className="text-xl font-bold">Chat History</h2>
        <ul className="mt-4">
          <li
            className="p-2 hover:bg-gray-700 cursor-pointer rounded"
            onClick={startNewChat}
          >
            <span className="font-bold">Start New Chat</span>
          </li>
          {chatHistory?.map((chat, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-700 cursor-pointer rounded"
              onClick={() => selectChat(chat)}
            >
              Chat {chatHistory.length - index} {/* 🔹 Show latest chat first */}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <button className="md:hidden p-2 bg-gray-800 rounded">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 max-w-xs rounded-lg text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-300 text-black  max-w-7xl"
              }`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  msg.text
                    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                    .replace(/(?<!\*)\*(\S.*?)\*(?!\*)/g, "<i>$1</i>")
                    .replace(/\n\* (.*?)/g, "<ul><li>$1</li></ul>")
                ),
              }}
            />
          ))}
          {loading && <div className="p-2 text-gray-500">Typing...</div>}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white flex items-center border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
