// import React, { useState, useEffect } from "react";
// import { Squash as HamburgerSquash } from "hamburger-react";
// import { useSpring, animated, useTrail } from "@react-spring/web";
// import { Link } from "react-router-dom";

// const Menu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLogo, setShowLogo] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);

//   let lastScrollY = 0;

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;

//       // if (scrollTop > lastScrollY && !isOpen) {
//       //   setIsVisible(false);
//       // } else {
//       //   setIsVisible(true);
//       // }

//       setShowLogo(scrollTop > 50);
//       setIsScrolled(scrollTop > 10);

//       lastScrollY = scrollTop > 0 ? scrollTop : 0;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isOpen]);

//   const menuAnimation = useSpring({
//     transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
//     opacity: isOpen ? 1 : 0,
//     config: { tension: 130, friction: 30 },
//   });

//   const items = [
//     { name: "Home", link: "/" },
//     { name: "About Us", link: "/about" },
//     { name: "Services", link: "/services" },
//     { name: "Blogs", link: "/events" },
//     { name: "Gallery", link: "/gallery" },
//     { name: "Career", link: "/career" },
//     { name: "Contact", link: "/contact" },
//   ];

//   const trail = useTrail(items.length, {
//     opacity: isOpen ? 1 : 0,
//     from: { opacity: 0 },
//     config: { tension: 220, friction: 20 },
//     reset: true,
//   });

//   return (
//     <>
//       {/* Navbar */}
//       <div
//         className={`fixed z-50 w-full transition-all duration-300 ${
//           isOpen
//             ? "bg-transparent h-16"
//             : isScrolled
//             ? "bg-white/95 backdrop-blur-sm h-20"
//             : "bg-transparent h-20"
//         } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
//       >
//         <div className="h-full px-5 md:px-10 flex justify-between items-center">
//           <div className="flex items-center">
//             <Link to="/">
//               <img
//                 src="/logo.png"
//                 alt="Logo"
//                 className={`w-28 transition-opacity duration-300 ${
//                   isOpen || !showLogo ? "opacity-0" : "opacity-100"
//                 }`}
//                 style={{
//                   filter: "drop-shadow(0 0px 6px rgba(255, 255, 255, 0.1))",
//                 }}
//               />
//             </Link>
//           </div>
          
//           <div className="z-50 flex items-center">
//             <HamburgerSquash
//               toggled={isOpen}
//               toggle={setIsOpen}
//               size={25}
//               direction="left"
//               duration={0.3}
//               distance="lg"
//               rounded
//               label="Show menu"
//               color="#DBAF76"
//               easing="ease-in"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Fullscreen Menu */}
//       <animated.div
//         style={menuAnimation}
//         className="fixed top-0 left-0 w-full h-screen z-40 bg-gray-900/95 backdrop-blur-md"
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center md:items-end h-full py-28 px-6 sm:py-20 sm:px-10 lg:px-28">
//           {/* Main Menu Items */}
//           <div className="flex flex-col gap-6 sm:gap-10 w-full text-center md:text-left">
//             {trail.map((style, index) => (
//               <animated.a
//                 key={items[index].name}
//                 href={items[index].link}
//                 style={style}
//                 className="font-parkin font-bold text-3xl sm:text-4xl text-[#DBAF76] lg:text-5xl"
//               >
//                 <span
//                   className="relative hover:text-white transition duration-300"
//                   onMouseEnter={(e) =>
//                     (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
//                   }
//                   onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//                 >
//                   {items[index].name}
//                 </span>
//               </animated.a>
//             ))}
//           </div>

//           {/* Social Links */}
//           <div className="flex flex-col items-center md:flex-row gap-3 md:gap-5 mt-10 md:mt-0">
//             <animated.a
//               href="https://www.instagram.com/mooxevents/"
//               target="_blank"
//               style={trail[items.length - 2]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Instagram
//             </animated.a>
//             <animated.a
//               href="https://www.facebook.com/mooxevents/"
//               target="_blank"
//               style={trail[items.length - 1]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Facebook
//             </animated.a>
//           </div>
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default Menu;


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { Menu as MenuIcon, X } from "lucide-react";

const Menu = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Event Gallery", link: "/gallery" },
    { name: "Blogs", link: "/events" },
    { name: "Career", link: "/career" },
    { name: "Contact", link: "/contact" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="relative z-50 w-full transition-all duration-300 bg-white h-20">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="h-full flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex-shrink-0 text-2xl md:-ml-28 font-bold text-[#1a2a47]">
              MOOX EVENTS PVT. LTD.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center -mr-28 space-x-8 uppercase">
            <div className="space-x-8 pr-28">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200 font-medium ${
                    location.pathname === item.link ? "text-[#d6af53]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 border-l pl-8 border-gray-200">
              <a
                href="http://wa.me//+918866258585"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://www.instagram.com/mooxevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/mooxevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/moox-events"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Mobile Menu Items */}
          <div className="mt-8 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200 font-medium ${
                  location.pathname === item.link ? "text-[#d6af53]" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Social Links */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <a
                href="http://wa.me//+918866258585"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://www.instagram.com/mooxevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/mooxevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/moox-events"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
