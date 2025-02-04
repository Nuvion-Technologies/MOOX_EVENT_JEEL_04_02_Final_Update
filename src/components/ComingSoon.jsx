import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import CustomCursor from "./CustomCursor";

const ComingSoon = () => {
  const slides = [
    { image: "/img1.jpg" },
    { image: "/img2.jpg" },
    { image: "/img3.jpg" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-row items-center justify-center w-full"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-8">
          {/* Logo Section */}
          <div className="mb-10">
            <img
              src="/logo.png"
              alt="Logo"
              className={`w-32 md:w-40 lg:w-48 transition-opacity duration-300 ${
                isScrolled ? "opacity-0" : "opacity-100"
              }`}
              style={{
                filter: "drop-shadow(0px 3px 7px rgba(255, 255, 255, 0.3))",
              }}
            />
          </div>

          {/* Text Content Section */}
          <div className="text-white text-center space-y-6">
            {/* Coming Soon Text */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{
                textShadow:
                  "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
              }}
            >
              Coming Soon
            </h1>

            {/* Type Animation */}
            <TypeAnimation
              sequence={[
                "Creating unforgettable moments",
                2200,
                "Crafting unique experiences",
                2200,
                "Building lasting memories",
                2200,
                "Launching something special",
                2200,
              ]}
              wrapper="span"
              speed={60}
              style={{
                fontSize: "1.5rem",
                display: "inline-block",
                textShadow: "0 0 5px rgba(255, 255, 255, 0.7)",
              }}
              repeat={Infinity}
            />

          </div>
          {/* Preview Link */}
          <div className="fixed bottom-0 right-0">
            <Link
              to="/live"
              className="text-white transition-colors"
              // style={{
              //   textShadow: "0 0 5px rgba(255, 255, 255, 0.7)",
              // }}
            >
              {/* <Eye className="size-5"/> */}
              <div className="w-14 h-14 bg-transperent"></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;