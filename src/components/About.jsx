import React, { useState, useEffect, useRef } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const useCountUp = (start, end, duration) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (isVisible) {
        setCount(start); // Reset count before counting
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, [isVisible, start, end, duration]);

    return count;
  };

  // Counting values
  const clientsCount = useCountUp(0, 200, 2000); // 2 seconds for animation
  const eventsCount = useCountUp(0, 150, 2000);
  const categoriesCount = useCountUp(0, 99, 2000);

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="py-20 px-6 flex w-full items-center justify-center flex-col min-h-fit"
    >
      <div className="flex w-full flex-col md:flex-row items-start justify-center h-full gap-12">
        {/* Left side: New Heading and description */}
        <div className="flex flex-col items-center justify-between w-full md:w-[60%] p-3">

          <p className="md:text-lg text-justify text-moox-navy mb-12 w-4/5 sm:w-full text-md">
          Moox Events Pvt. Ltd. is an event management & wedding planning company providing various services for all sorts of corporate and personal events. We strive to create unforgettable experiences by offering innovative and personalized event solutions to ensure 100% client satisfaction.
          </p>

          <div className="flex items-center justify-center gap-12 w-5/6 md:w-full flex-col md:flex-row">
            {/* Card 1: Creative Design */}
            <div className="h-96 w-full sm:w-4/5 md:w-1/3 justify-between flex flex-col items-center text-center bg-moox-navy text-white p-6 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 group">
              {/* Rotating SVG */}

              {/* Card Content */}
              <h3 className="text-2xl font-semibold mb-3 text-moox-gold">
              CORPORATE <br/>EVENTS
              </h3>
              <p className="text-customTitle opacity-90 -mt-5 text-justify">
              We deliver exceptional corporate events with meticulous attention to detail. Our experts ensure seamless execution and innovative solutions.
              </p>
              <div className="flex flex-row justify-center items-center mt-4 gap-3">
                <span className="text-moox-gold text-4xl">{clientsCount}+</span>{" "}
                EVENTS <br/>ORGANIZED
              </div>
            </div>

            {/* Card 2: Flawless Coordination */}
            <div className="h-96 w-full sm:w-4/5 md:w-1/3 flex flex-col items-center justify-between text-center bg-moox-navy text-white p-6 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-moox-gold">
              WEDDING <br/>PLANNING
              </h3>
              <p className="text-customTitle opacity-90 text-justify">
              With a keen eye for detail and a passion for perfection, our wedding planning services ensure that every aspect of your special day is flawlessly orchestrated.
              </p>
              <div className="flex flex-row justify-center items-center mt-4 gap-3">
                <span className="text-moox-gold text-4xl">{eventsCount}+</span>{" "}
                WEDDINGS <br/>PLANNED
              </div>
            </div>

            {/* Card 3: Timely Execution */}
            <div className="h-96 w-full sm:w-4/5 md:w-1/3 flex flex-col items-center justify-between text-center bg-moox-navy text-white p-6 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-moox-gold">
              THEME <br/>DECORATION
              </h3>
              <p className="text-customTitle opacity-90 text-justify">
              Elevate the ambiance of your event with our exquisite venue decoration services, tailored to reflect your personal style and theme.
              </p>
              <div className="flex flex-row justify-center items-center mt-4 gap-3">
                <span className="text-moox-gold text-4xl">
                  {categoriesCount}%
                </span>{" "}
                CLIENT <br/>SATISFACTION
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 flex justify-center animate__animated animate__fadeIn animate__delay-4s">
            <a
              href="/contact"
              className="px-8 py-3 text-lg font-semibold bg-moox-gold text-moox-navy rounded-full hover:bg-moox-navy hover:text-white transition duration-300 ease-in-out"
            >
              Let's Plan Your Event
            </a>
          </div>
        </div>

        {/* Right side: ABOUT Letters animation (hidden on mobile/tablet) */}
        <div className="hidden md:flex w-[150px] h-auto items-start">
          <div className="w-full gap-3 flex flex-col">
            {" A B O U T".split(" ").map((letter, index) => (
              <div
                key={index}
                className={`w-full flex items-end justify-end text-7xl font-bold text-moox-gold opacity-90 animate__animated animate__fadeIn animate__delay-${
                  index + 1
                }s`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


