import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer({ language = "en" }) {
  const [translated, setTranslated] = useState({
    aboutTitle: "About us",
    company: ["About us", "Blog", "Careers"],
    products: ["Ride", "Drive"],
    travel: ["Reserve", "Airports", "Cities"],
    copyRight: "© 2025 Ten Transport. All rights reserved.",
  });

  useEffect(() => {
    async function translateText() {
      try {
        if (language === "en") return;
        const texts = [
          translated.aboutTitle,
          ...translated.company,
          ...translated.products,
          ...translated.travel,
          translated.copyRight,
        ];
        const query = texts.join("||");
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=en|${language}`
        );
        const data = await response.json();
        if (!data.responseData.translatedText) return;

        const parts = data.responseData.translatedText.split("||");
        setTranslated({
          aboutTitle: parts[0] || translated.aboutTitle,
          company: parts.slice(1, 4),
          products: parts.slice(4, 6),
          travel: parts.slice(6, 9),
          copyRight: parts[9] || translated.copyRight,
        });
      } catch (err) {
        console.error("Footer translation failed:", err);
      }
    }
    translateText();
  }, [language]);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Ten Transport</h3>
          <Link to="/help" className="text-sm text-gray-400 hover:text-white">
            Visit Help Center
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">{translated.aboutTitle}</h3>
          <ul className="space-y-2">
            {translated.company.map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/about"
                  className="hover:text-white text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Products</h3>
          <ul className="space-y-2">
            {translated.products.map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/ride"
                  className="hover:text-white text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Travel</h3>
          <ul className="space-y-2">
            {translated.travel.map((item, idx) => (
              <li key={idx}>
                <Link
                  to="/ride"
                  className="hover:text-white text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        {translated.copyRight}
      </div>
    </footer>
  );
}
