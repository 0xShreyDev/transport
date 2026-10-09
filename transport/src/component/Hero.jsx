import { useState, useEffect, useRef } from "react";
import image from "../assets/image.png";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaLocationArrow } from "react-icons/fa";
import { BsDot, BsSquareFill } from "react-icons/bs";
import { translateMany } from "../utils/freeTranslate";
import LoadingPage from "./LoadingPage";

const servicesEN = ["Taxi", "Mini Bus", "Luxury Car", "Bike Ride", "Goods Transport"];

const defaultLabels = {
  headingLine1: "Go anywhere with",
  headingLine2: "Ten Transport",
  pickup: "Pickup location",
  dropoff: "Dropoff location",
  seePrices: "See prices",
  loginActivity: "Log in to see your recent activity",
  selectService: "Select a service",
  services: servicesEN,
};

export default function Hero({ language = "en" }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [labels, setLabels] = useState(defaultLabels);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split("T")[0]);
    setSelectedTime("12:00");
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function translateLabels() {
      if (language === "en") {
        setLabels(defaultLabels);
        return;
      }
      try {
        setLoading(true);
        const texts = [
          "Go anywhere with",
          "Pickup location",
          "Dropoff location",
          "See prices",
          "Log in to see your recent activity",
          "Select a service",
          ...servicesEN,
        ];
        const translated = await translateMany(texts, language, "en");
        if (cancelled) return;
        setLabels({
          headingLine1: translated[0] || defaultLabels.headingLine1,
          headingLine2: defaultLabels.headingLine2,
          pickup: translated[1] || defaultLabels.pickup,
          dropoff: translated[2] || defaultLabels.dropoff,
          seePrices: translated[3] || defaultLabels.seePrices,
          loginActivity: translated[4] || defaultLabels.loginActivity,
          selectService: translated[5] || defaultLabels.selectService,
          services: translated.slice(6).length ? translated.slice(6) : servicesEN,
        });
      } catch (err) {
        console.error("Hero translation failed:", err);
        setLabels(defaultLabels);
      } finally {
        setLoading(false);
      }
    }
    translateLabels();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <section className="relative">
      <LoadingPage visible={loading} text="Translating Hero..." />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 lg:px-16 py-10 lg:pt-25 overflow-hidden">
        <motion.div
          className="w-full lg:w-1/2 mt-20 flex justify-center mb-6 lg:mt-0"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img ref={imageRef} className="rounded-3xl w-full" src={image} alt="Hero" />
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-xl flex flex-col items-start"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight text-left">
            {labels.headingLine1} <br />
            <span className="text-green-700 pl-2">{labels.headingLine2}</span>
          </h2>
          <div className="flex flex-col gap-4 w-full">
            <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg w-full">
              <BsDot className="text-black text-2xl mr-3" />
              <input
                type="text"
                placeholder={labels.pickup}
                className="bg-transparent outline-none w-full"
              />
              <FaLocationArrow className="text-gray-600" />
            </div>
            <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg w-full">
              <BsSquareFill className="text-black text-sm mr-3" />
              <input
                type="text"
                placeholder={labels.dropoff}
                className="bg-transparent outline-none w-full"
              />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-lg w-full">
              <select
                className="bg-transparent outline-none w-full"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">{labels.selectService}</option>
                {labels.services.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg w-full">
                <FaCalendarAlt className="mr-3 text-black" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent outline-none w-full"
                />
              </div>
              <div className="bg-gray-100 flex items-center px-4 py-3 rounded-lg w-full">
                <FaClock className="mr-3 text-black" />
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-start">
            <a
              href="/ride"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto hover:bg-green-700 transition-colors"
            >
              {labels.seePrices}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
