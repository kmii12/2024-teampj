"use client";

import Link from "next/link";
import styles from "./Result.module.scss";
import { usePathname } from "next/navigation";

export default function Result() {
  const pathname = usePathname();
  return (
    <>
      <h1>本を探す</h1>

      <div className={}></div>
    </>
  );
}
