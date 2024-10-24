import React from 'react';

const Modal = ({ render, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-1/3 relative transition-transform transform scale-100 hover:scale-105">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-200"
          aria-label="Close">
          &times;
        </button>

        <div className='m-4'>
          {render()}
        </div>
      </div>
    </div>
  );
};

export default Modal;