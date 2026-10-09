import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Footer from "./Footer";

export default function About() {
  const { language, setLoading } = useOutletContext(); // get from outlet context

  const sectionsData = [
    {
      title: "Who We Are",
      text: "We are a leading transport and logistics company, committed to providing safe, fast, and reliable transportation services worldwide. From goods transport to passenger rides, our mission is to keep the world moving smoothly.",
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Our Mission",
      text: "Our mission is to deliver excellence in transportation by focusing on safety, efficiency, and sustainability. We strive to connect people and businesses through reliable transport solutions.",
      img: "https://thumbs.dreamstime.com/b/logistics-import-export-background-transport-industry-container-cargo-freight-ship-sunset-sky-137520342.jpg",
    },
    {
      title: "What We Do",
      text: "We provide comprehensive services including freight forwarding, passenger transport, logistics management, and last-mile delivery solutions – tailored to your needs.",
      img: "https://navata.com/cms/wp-content/uploads/2021/06/trade-istock-973098-1618127457.jpg",
    },
    {
      title: "Why Choose Us",
      text: "With years of expertise, modern fleets, and a dedicated team, we ensure timely deliveries and comfortable journeys. We value trust and aim to be your most reliable transport partner.",
      img: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [translatedSections, setTranslatedSections] = useState(sectionsData);

  // translate API
  const translateText = async (text, targetLang) => {
    if (targetLang === "en") return text;
    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLang,
          format: "text",
        }),
      });
      const data = await res.json();
      return data.translatedText;
    } catch (err) {
      console.error("Translation error:", err);
      return text;
    }
  };

  const translateSections = async () => {
    setLoading(true);
    const translated = await Promise.all(
      sectionsData.map(async (section) => ({
        ...section,
        title: await translateText(section.title, language),
        text: await translateText(section.text, language),
      }))
    );
    setTranslatedSections(translated);
    setLoading(false);
  };

  useEffect(() => {
    translateSections();
  }, [language]);

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true },
  });

  return (
    <>
      <div className="bg-gray-50 min-h-screen pt-28 px-6 lg:px-20 mb-20">
        <motion.h1
          {...fadeIn(0)}
          className="text-4xl font-bold text-center text-blue-700 mb-12"
        >
          {language === "en" ? "About Us" : "About Us"} {/* optional: translate title too */}
        </motion.h1>

        <div className="space-y-16">
          {translatedSections.map((section, index) => (
            <motion.div
              key={index}
              {...fadeIn(index * 0.3)}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={section.img}
                alt={section.title}
                className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
              />
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-700 text-base sm:text-lg">{section.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer language={language} />
    </>
  );
}
