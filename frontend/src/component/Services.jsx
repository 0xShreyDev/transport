import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { translateMany } from "../utils/freeTranslate";
import rideImg from "../assets/ride.png";
import driveImg from "../assets/drive.png";
import transportImg from "../assets/tranport.png";
import reserveImg from "../assets/Reserve.png";
import intercityImg from "../assets/Intercity.png";
import hourlyImg from "../assets/Hourly.png";


export default function Services({ language = "en" }) {
  const navigate = useNavigate();

  const originalFeatures = [
    { icon: rideImg, title: "Ride", desc: "Go anywhere with ten transport. Request a ride, hop in, and go." },
    { icon: driveImg, title: "Drive", desc: "Reliable transport services ensuring safe, fast, and comfortable travel for every journey." },
    { icon: transportImg, title: "Transport", desc: "Access our vast digital library of educational resources, textbooks, and interactive learning materials." },
    { icon: reserveImg, title: "Reserve", desc: "Reserve your ride in advance so you can relax on the day of your trip." },
    { icon: intercityImg, title: "Intercity", desc: "Get convenient, affordable outstation cabs anytime at your door." },
    { icon: hourlyImg, title: "Rentals", desc: "Request a trip for a block of time and make multiple stops." },
  ];

  const [translatedFeatures, setTranslatedFeatures] = useState(originalFeatures);
  const [btnLabel, setBtnLabel] = useState("Details");

  useEffect(() => {
    let cancelled = false;

    async function runTranslation() {
      if (language === "en") {
        setTranslatedFeatures(originalFeatures);
        setBtnLabel("Details");
        return;
      }

      try {
        const texts = [
          ...originalFeatures.map(f => f.title),
          ...originalFeatures.map(f => f.desc),
          "Details",
        ];
        const translated = await translateMany(texts, language, "en");
        if (cancelled) return;

        const titles = translated.slice(0, originalFeatures.length);
        const descs = translated.slice(originalFeatures.length, originalFeatures.length * 2);
        const button = translated[translated.length - 1];

        const updatedFeatures = originalFeatures.map((item, idx) => ({
          ...item,
          title: titles[idx] || item.title,
          desc: descs[idx] || item.desc,
        }));

        setTranslatedFeatures(updatedFeatures);
        setBtnLabel(button || "Details");
      } catch (err) {
        console.error("Services translation failed:", err);
        setTranslatedFeatures(originalFeatures);
        setBtnLabel("Details");
      }
    }

    runTranslation();
    return () => { cancelled = true; };
  }, [language]);

  return (
    <>
      <h1 className="text-4xl font-extrabold lg:pt-20 pt-20 lg:px-20 text-center lg:text-left">
        Services
      </h1>

      <div className="flex justify-center items-center mt-4 p-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {translatedFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.desc}</p>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <button
                  onClick={() => navigate("/ride")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                >
                  {btnLabel}
                </button>
                <img src={feature.icon} alt={feature.title} className="w-20 h-20 object-contain" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
     
    </>
  );
}
