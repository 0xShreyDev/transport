import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { translateMany } from "../utils/freeTranslate";

const defaultLabels = {
  headingLine1: "The Ten Transport you know, reimagined for business",
  headingLine2: "Transport",
  description1:
    "Ten Transport for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.",
  getStarted: "Get Started",
  checkSolutions: "Check out our solutions",
  headingLine3: "Seamless and Efficient Deliveries with Ten Transport",
  description2:
    "Ten Transport Delivery Services provide a reliable and fast solution for delivering packages across the city, with real-time tracking and updates.",
  startDelivering: "Start Delivering",
  learnMore: "Learn More",
};

export default function Testimonial({ language = "en" }) {
  const [labels, setLabels] = useState(defaultLabels);

  useEffect(() => {
    let cancelled = false;

    async function runTranslation() {
      if (language === "en") {
        if (!cancelled) setLabels(defaultLabels);
        return;
      }

      try {
        const texts = Object.values(defaultLabels);
        const translated = await translateMany(texts, language, "en");
        if (cancelled) return;

        if (!translated || translated.length < texts.length) {
          setLabels(defaultLabels);
          return;
        }

        setLabels(Object.fromEntries(Object.keys(defaultLabels).map((key, idx) => [key, translated[idx]])));
      } catch (err) {
        console.error("Testimonial translation failed:", err);
        setLabels(defaultLabels);
      }
    }

    runTranslation();
    return () => { cancelled = true; };
  }, [language]);

  return (
    <div className="space-y-10 overflow-x-hidden">
      <div className="max-w-[85%] mx-auto">
     
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-10 bg-gray-50"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{labels.headingLine1}</h2>
            <p className="text-lg text-gray-700 mb-6">{labels.description1}</p>
            <div className="flex gap-4">
              <a href="#" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">{labels.getStarted}</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition">{labels.checkSolutions}</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <motion.img
              loading="lazy"
              src="https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Ten Transport for Business"
              className="w-full h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between px-4 py-10 bg-gray-50"
        >
          <div className="w-full md:w-1/2 md:mr-8">
            <motion.img
              loading="lazy"
              src="https://images.unsplash.com/photo-1482287068671-7fb7325e1a8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Ten Transport Delivery Services"
              className="w-full h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{labels.headingLine3}</h2>
            <p className="text-lg text-gray-700 mb-6">{labels.description2}</p>
            <div className="flex gap-4">
              <a href="/ride" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">{labels.startDelivering}</a>
              <a href="/ride" className="text-indigo-600 hover:text-indigo-700 transition">{labels.learnMore}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
