import { useEffect, useState } from "react";

export const capitalizeFirst = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const useCanHover = () => {
  const [canHover, setCanHover] = useState(
    () => window.matchMedia("(hover: hover)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return canHover;
};
