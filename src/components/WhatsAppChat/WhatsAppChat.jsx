import React, { useState } from 'react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '971556502875';
  const message = "Hi, I'm interested in a property on Siddiq Properties";

  const handleOpenChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-[5rem] right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 bg-white border rounded-lg shadow-lg p-4 w-64 relative">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-700">Need help? Chat with us on WhatsApp!</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-sm ml-2"
              aria-label="Close"
            >
              ✖
            </button>
          </div>
          <button
            onClick={handleOpenChat}
            className="bg-button text-white px-4 py-2 rounded  transition w-full"
          >
            Start Chat
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-button rounded-full w-14 h-14 flex items-center justify-center shadow-lg  transition"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </button>
    </div>
  );
};

export default WhatsAppChat;
