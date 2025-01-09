"use client";

import Header from "../components/Header";
// import SearchBar from "./components/SearchBar";
import styles from "./saved.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//firebase
import { db } from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function Saved() {
  return (
    <>
      <Header />
      <h1>保存した絵本</h1>
    </>
  );
}
