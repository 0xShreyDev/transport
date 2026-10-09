import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
import VerifyEmail from "./component/VerifyEmail";
import Verify from "./component/Verify";
import ForgotPassword from "./component/ForgotPassword";
import VerifyOTP from "./component/VerifyOTP";
import ChangePassword from "./component/ChangePassword";
import AuthSuccess from "./component/AuthSuccess";
import Services from "./component/Services";
import Testimonials from "./component/Testimonial";
import Contact from "./component/Contect";
import About from "./component/About";
import Blog from "./component/TransportBlogPage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import Ride from "./component/Ride";
import Help from "./component/Help";
import LoadingPage from "./component/LoadingPage"; 

const AppLayout = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "en");
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser || savedUser === "undefined" || savedUser === "null") return null;
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const [translatedContent, setTranslatedContent] = useState({});
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <>
      <Navbar 
        language={language} 
        onChangeLanguage={setLanguage} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      
      <Outlet context={{ 
        user, handleLogin, handleLogout, 
        language, translatedContent,
        loading, setLoading 
      }} />

      
      <LoadingPage visible={loading} text="Translating... Please wait" />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element:
       <>
          <Hero language={localStorage.getItem("lang") || "en"} />
          <Services language={localStorage.getItem("lang") || "en"} />
          <Testimonials language={localStorage.getItem("lang") || "en"} />
          <Footer language={localStorage.getItem("lang") || "en"} />
        </> 
      },
      { path: "home", element: <Home language={localStorage.getItem("lang") || "en"}/> },
      { path: "help", element: <Help language={localStorage.getItem("lang") || "en"}/> },
      { path: "blog", element: <Blog language={localStorage.getItem("lang") || "en"}/> },
      { path: "ride", element: <Ride language={localStorage.getItem("lang") || "en"}/> },
      { path: "signup", element: <Signup language={localStorage.getItem("lang") || "en"}/> },
      { path: "login", element: <Login language={localStorage.getItem("lang") || "en"}/> },
      { path: "verify", element: <VerifyEmail language={localStorage.getItem("lang") || "en"}/> },
      { path: "verify/:token", element: <Verify language={localStorage.getItem("lang") || "en"}/> },
      { path: "auth-success", element: <AuthSuccess language={localStorage.getItem("lang") || "en"}/> },
      { path: "forgot-password", element: <ForgotPassword language={localStorage.getItem("lang") || "en"}/> },
      { path: "verify-otp/:email", element: <VerifyOTP language={localStorage.getItem("lang") || "en"}/> },
      { path: "change-password/:email", element: <ChangePassword language={localStorage.getItem("lang") || "en"}/> },
      { path: "services", element: <Services language={localStorage.getItem("lang") || "en"} /> },
      { path: "testimonials", element: <Testimonials language={localStorage.getItem("lang") || "en"} /> },
      { path: "contact", element: <Contact language={localStorage.getItem("lang") || "en"} /> },
      { path: "about", element: <About language={localStorage.getItem("lang") || "en"} /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;
export default App;
