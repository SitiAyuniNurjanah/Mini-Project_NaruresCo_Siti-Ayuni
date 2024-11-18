import React, { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import { apiKey, getAllProducts } from "../../services/products";
import { generateChatResponse } from "../../services/ai";
import ReactMarkdown from "react-markdown";
import { MdSend } from "react-icons/md";

const FloatingChat = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [messages, setMessages] = useState([
    {
      text: "Hallo sahabat Natures! Ada yang bisa Nana bantu? Nana bisa menjawab pertanyaan mengenai produk ramah lingkungan, tips, atau informasi produk kami.",
      isUser: false,
    },
  ]);
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    getAllProducts((data) => {
      setDataProduct(data);
    });
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target)
      ) {
        setIsChatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsgObj = { text: message, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMsgObj]);
    setMessage("");

    const productNames = dataProduct.map((product) =>
      product.name.toLowerCase()
    );
    const containsProductName = productNames.some((name) =>
      message.toLowerCase().includes(name)
    );

    let modifiedMessage;
    if (containsProductName) {
      const foundProducts = dataProduct.filter((product) =>
        message.toLowerCase().includes(product.name.toLowerCase())
      );
      modifiedMessage = `User bertanya tentang produk ini: ${JSON.stringify(
        foundProducts
      )}. Berikan informasi produk tersebut kepada pengguna.`;
    } else {
      modifiedMessage = `Halo AI! Jawablah pertanyaan berikut ini hanya jika berkaitan dengan:
- Produk ramah lingkungan
- Tips dari halaman web kami
- Informasi produk yang tersedia

Jika pertanyaan tidak relevan, arahkan pengguna untuk menghubungi admin. Pertanyaan pengguna: "${message}"`;
    }

    const aiResponseText = await generateChatResponse(modifiedMessage, apiKey);
    const aiMsgObj = { text: aiResponseText, isUser: false };
    setMessages((prevMessages) => [...prevMessages, aiMsgObj]);
  };

  return (
    <div>
      {/* Chat Icon Button */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-1 text-white p-4 rounded-full shadow-lg hover:bg-primary-focus cursor-pointer transition duration-300 z-50"
      >
        {isChatOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-20 right-6 w-[70vh] h-[70vh] bg-2 text-neutral-content rounded-lg shadow-lg p-4 flex flex-col z-50"
        >
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
            <h2 className="text-lg text-neutral font-bold">Q&A Product</h2>
          </div>

          <div className="flex-1 overflow-y-auto bg-neutral-focus p-2 rounded-md mb-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.isUser ? "chat-end" : "chat-start"
                } mb-2`}
              >
                <div className="chat-bubble bg-1">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center space-x-2 mt-auto"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 bg-offWhite text-neutral border-1 rounded-md border focus:outline-none focus:border-primary-focus"
            />
            <button
              type="submit"
              className="text-1 p-2 rounded-full hover:bg-primary-focus transition duration-300"
            >
              <MdSend size={25} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
