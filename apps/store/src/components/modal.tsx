import React from "react";

type ModalProps = {
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative bg-primary/10 p-6 rounded rounded-lg shadow-lg w-1/2">
        <button
          className="absolute top-4 right-4 text-white-600 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times; {/* Larger close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};