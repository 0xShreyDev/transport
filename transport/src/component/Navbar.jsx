import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaGlobe } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { translateMany } from "../utils/freeTranslate";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
];

const defaultLabels = {
  home: "Home",
  about: "About",
  services: "Services",
  contact: "Contact",
  login: "Login",
  signup: "Signup",
  myAccount: "My Account",
  profile: "Profile",
  logout: "Logout",
};

export default function Navbar({
  language = "en",
  user,
  setUser,
  onChangeLanguage = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [labels, setLabels] = useState(defaultLabels);

  const logoutHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("keepLoggedIn");
      localStorage.removeItem("lang");
      if (setUser) setUser(null);
      if (accessToken) {
        await axios.post(
          "http://localhost:8000/user/logout",
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    async function translateLabels() {
      if (language === "en") {
        setLabels(defaultLabels);
        return;
      }
      try {
        const texts = Object.values(defaultLabels);
        const translated = await translateMany(texts, language, "en");
        setLabels(
          Object.fromEntries(
            Object.keys(defaultLabels).map((key, idx) => [
              key,
              translated[idx] || defaultLabels[key],
            ])
          )
        );
      } catch {
        setLabels(defaultLabels);
      }
    }
    translateLabels();
  }, [language]);

  const handleLanguageChange = (code) => {
    localStorage.setItem("lang", code);
    onChangeLanguage(code);
    window.location.reload(); // page reload on language change
  };

  return (
    <nav className="bg-white shadow-md fixed w-screen z-50 p-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img className="h-12 w-12" src={logo} alt="Logo" />
          <h1 className="font-bold text-xl">
            <span className="text-green-600">Ten</span> Transport
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li>
              <Link to="/home">{labels.home}</Link>
            </li>
            <li>
              <Link to="/about">{labels.about}</Link>
            </li>
            <li>
              <Link to="/services">{labels.services}</Link>
            </li>
            <li>
              <Link to="/contact">{labels.contact}</Link>
            </li>
          </ul>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <FaGlobe />
              <span className="uppercase">{language}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden z-50"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        language === l.code ? "font-semibold" : ""
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className="bg-green-600 text-white">
                    {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                  <AvatarImage src={user.avatar} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{labels.myAccount}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User /> {labels.profile}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                  <LogOut /> {labels.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-3 py-1 border border-green-600 rounded-md font-semibold hover:bg-green-600 hover:text-white transition"
              >
                {labels.login}
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
              >
                {labels.signup}
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2 ml-auto">
          {user ? (
            <Avatar>
              <AvatarFallback className="bg-green-600 text-white">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
              <AvatarImage src={user.avatar} />
            </Avatar>
          ) : (
            <>
              <Link
                to="/login"
                className="px-2 py-1 border border-green-600 rounded-md font-semibold hover:bg-green-600 hover:text-white transition text-sm"
              >
                {labels.login}
              </Link>
              <Link
                to="/signup"
                className="px-2 py-1 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition text-sm"
              >
                {labels.signup}
              </Link>
            </>
          )}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white px-4 py-3 space-y-2 shadow-lg text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/home" className="block hover:text-blue-600">
              {labels.home}
            </Link>
            <Link to="/about" className="block hover:text-blue-600">
              {labels.about}
            </Link>
            <Link to="/services" className="block hover:text-blue-600">
              {labels.services}
            </Link>
            <Link to="/contact" className="block hover:text-blue-600">
              {labels.contact}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
