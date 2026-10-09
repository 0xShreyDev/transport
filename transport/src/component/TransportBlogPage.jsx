import React, { useEffect, useState } from "react";
import { translateMany } from "../utils/freeTranslate";

const blogPosts = [
    {
        title: "Ten Transport Experience Zone at Chaudhary Charan Singh Airport",
        image: "https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "We are excited to announce the launch of the Ten Transport Experience Zone at the Arrival section of the Domestic Terminal at Chaudhary Charan Singh Airport. This new feature aims to enhance your pickup experience, making it more seamless and convenient.",
        author: "John Doe",
        date: "August 30, 2025",
        link: "#",
    },
    {
        title: "Ten Transport MOTO: Quick and Affordable Rides",
        image: "https://images.unsplash.com/photo-1519750078696-b5051c379982?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Introducing Ten Transport MOTO – your go-to solution for beating the traffic and getting to your destination quickly. With fares starting at ₹15*, MOTO offers an affordable and efficient ride option.",
        author: "Jane Smith",
        date: "August 29, 2025",
        link: "#",
    },
    {
        title: "Flat Fares for Ten Transport GO and Ten Transport X",
        image: "https://images.unsplash.com/photo-1614976523626-d598aafd4fda?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Good news! For this week only (March 6 – 12), all Ten Transport GO rides across Lucknow will cost ₹79 flat, and all Ten Transport X rides at ₹99. No promo codes or cashback required – just request a ride and pay the flat fare.",
        author: "Michael Brown",
        date: "August 28, 2025",
        link: "#",
    },
    {
        title: "HIRE: Your Personal Car for the Day",
        image: "https://images.unsplash.com/photo-1676288176918-232f7caadfee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Need a car for a few hours? HIRE is now available in Lucknow, offering you the flexibility to rent a car for local city travel.",
        author: "Sarah Lee",
        date: "August 27, 2025",
        link: "#",
    },
    {
        title: "Ten Transport Delivery Services Now in Your Area",
        image: "https://images.unsplash.com/photo-1482287068671-7fb7325e1a8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Introducing Ten Transport’s new delivery services. Whether you need to transport goods, parcels, or packages, our delivery service is now available to meet your needs efficiently.",
        author: "David Johnson",
        date: "August 25, 2025",
        link: "#",
    },
    {
        title: "Ten Transport Carpool: A Sustainable Future",
        image: "https://plus.unsplash.com/premium_photo-1681487863055-6e87ed3c53b9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Carpool with Ten Transport for a more sustainable future. Save money, reduce traffic, and help the environment by sharing rides with others in your area.",
        author: "Alice Williams",
        date: "August 24, 2025",
        link: "#",
    },
];

const TransportBlogPage = ({ language = "en" }) => {
    const [translatedPosts, setTranslatedPosts] = useState(blogPosts);

    useEffect(() => {
        let cancelled = false;

        const translateBlogPosts = async () => {
            const posts = blogPosts.map(post => [post.title, post.description]);
            const order = posts.flat();

            if (language === "en") {
                setTranslatedPosts(blogPosts);
                return;
            }

            try {
                const translated = await translateMany(order, language, "en");
                if (cancelled) return;
                const updatedPosts = blogPosts.map((post, index) => {
                    const [title, description] = translated.slice(index * 2, index * 2 + 2);
                    return {
                        ...post,
                        title,
                        description
                    };
                });
                setTranslatedPosts(updatedPosts);
            } catch (err) {
                console.error("Translation failed:", err);
            }
        };

        translateBlogPosts();
        return () => {
            cancelled = true;
        };
    }, [language]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                {language === "en" ? "Ten Transport Blog" : "टेन ट्रांसपोर्ट ब्लॉग"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {translatedPosts.map((post, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
                            <p className="text-gray-600 text-base mb-4">{post.description}</p>
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>By {post.author}</span>
                                <span>{post.date}</span>
                            </div>
                            <a
                                href={post.link}
                                className="text-indigo-600 hover:text-indigo-800 mt-4 block transition-all duration-300"
                            >
                                {language === "en" ? "Read More" : "और पढ़ें"}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransportBlogPage;
