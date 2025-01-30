"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function FooterHidden() {
  const pathname = usePathname();
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const orientation = window.screen.orientation || {};
      setIsLandscape(orientation.type.includes("landscape"));
    };

    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  // 条件: "/read"かつ縦向きの場合はFooterを表示
  const shouldShowFooter = pathname.startsWith("/read") ? !isLandscape : true;

  return shouldShowFooter ? <Footer /> : null;
}
