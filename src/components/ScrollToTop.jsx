import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change and page reload
    const scrollToTop = () => {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" // Changed to smooth for a nicer effect
          });
        }, 100); // 100ms delay before scrolling
      };

    // Scroll on route change
    scrollToTop();

    // Add event listener for page reload
    window.addEventListener('beforeunload', scrollToTop);

    return () => {
      window.removeEventListener('beforeunload', scrollToTop);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;