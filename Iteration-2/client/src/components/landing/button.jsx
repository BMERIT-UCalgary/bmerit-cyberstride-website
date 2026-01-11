import React from 'react';
//import './button.css';

function Button({ text, onClick }) {
  return (
    <button
      className="bg-black text-white text-2xl font-semibold py-5 px-8 
            rounded-xl border-none cursor-pointer w-[40dvw] h-[40dvh] 
            hover:bg-gray-600 transition-colors mt-auto active:opacity-70"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
