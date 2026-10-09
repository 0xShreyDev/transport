import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { translateMany } from "../utils/freeTranslate";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const defaultTexts = {
  heading: "Get in Touch",
  description:
    "Have questions or need assistance? Fill out the form below or contact us using the details provided.",
  nameLabel: "Name",
  namePlaceholder: "Enter your name",
  emailLabel: "Email",
  emailPlaceholder: "Enter your email",
  messageLabel: "Message",
  messagePlaceholder: "Write your message",
  sendButton: "Send Message",
  phoneHeading: "Phone",
  phoneValue: "+91 98765 43210",
  emailHeading: "Email",
  emailValue: "support@ten-transport.com",
  addressHeading: "Address",
  addressValue: "123 Transport Street, Delhi, India",
};

export default function Contact() {
  const { language, setLoading } = useOutletContext();
  const [texts, setTexts] = useState(defaultTexts);

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true);
      if (language === "en") {
        setTexts(defaultTexts);
        setLoading(false);
        return;
      }
      try {
        const keys = Object.keys(defaultTexts);
        const values = Object.values(defaultTexts);
        const translated = await translateMany(values, language, "en");
        const newTexts = {};
        keys.forEach((key, idx) => {
          newTexts[key] = translated[idx] || defaultTexts[key];
        });
        setTexts(newTexts);
      } catch {
        setTexts(defaultTexts);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [language, setLoading]);

  return (
    <div className="bg-gray-50 flex justify-center items-center py-10">
      <div className="bg-gray-50 h-[100%] w-[100%] py-16 px-6 lg:px-20 shadow-lg rounded-xl">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 text-blue-700"
        >
          {texts.heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          {texts.description}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-2xl p-8"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">{texts.nameLabel}</label>
                <input
                  type="text"
                  placeholder={texts.namePlaceholder}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">{texts.emailLabel}</label>
                <input
                  type="email"
                  placeholder={texts.emailPlaceholder}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">{texts.messageLabel}</label>
                <textarea
                  placeholder={texts.messagePlaceholder}
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {texts.sendButton}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-5">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <div>
                <h3 className="font-semibold text-gray-800">{texts.phoneHeading}</h3>
                <p className="text-gray-600">{texts.phoneValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-5">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <div>
                <h3 className="font-semibold text-gray-800">{texts.emailHeading}</h3>
                <p className="text-gray-600">{texts.emailValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-5">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              <div>
                <h3 className="font-semibold text-gray-800">{texts.addressHeading}</h3>
                <p className="text-gray-600">{texts.addressValue}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
