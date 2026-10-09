import React from "react";

export default function LoadingPage({ visible, text = "Translating..." }) {
  if (!visible) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl">
        <div className="h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-medium">{text}</p>
      </div>
    </div>
  );
}
