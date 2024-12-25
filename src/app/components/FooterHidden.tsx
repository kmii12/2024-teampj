"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterHidden() {
  const pathname = usePathname();
  return !pathname.startsWith("/read") ? <Footer /> : null; // "/read" 以外で Footer を表示
}
