import React from "react";

const helpSections = [
  {
    title: "Riders",
    description: "Find answers for your trips, payments, and account issues.",
    
  },
  {
    title: "Drivers",
    description: "Get help with earnings, trips, and account support.",
    
  },
  {
    title: "Ten Transport",
    description: "Support for your orders and restaurant issues.",
    
  },
  {
    title: "Ten Transport for Business",
    description: "Manage your corporate account and business trips.",
    
  },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-white shadow-md py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-700">Ten Transport Help Center</h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Official Ten Transport Help
          </a>
        </div>
      </header>

      <section className="bg-green-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How can we help you?</h2>
          <p className="text-gray-600 text-lg">
            Choose your category to quickly find the help you need.
          </p>
        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {helpSections.map((section, idx) => (
          <a
            key={idx}
            href={section.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
            <span className="mt-4 inline-block text-green-700 font-medium hover:underline">
              Go to help →
            </span>
          </a>
        ))}
      </section>

     
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          © 2025 Ten Transport. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
