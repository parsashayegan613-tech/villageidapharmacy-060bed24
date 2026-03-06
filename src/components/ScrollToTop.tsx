import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Temporarily remove smooth scroll on navigation to snap to top instantly
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    // Restore smooth scrolling from CSS after a tiny delay
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 10);

    return () => clearTimeout(timeout);
  }, [pathname]);
  return null;
}
