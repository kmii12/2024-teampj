"use client";

import Link from "next/link";
// import styles from "./saved.module.scss";
// import { usePathname } from "next/navigation";
import SearchBar from "@/app/components/SearchBar";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";

//firesBase
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

// import { useSearchParams } from "next/navigation";
interface PictureBook {
  id: string;
  title: string;
  writer: string;
  image: string;
  mainCharacter: string;
  character: string[];
  genre: string;
  location: string;
  atmosphere: string[];
}

// export default function detailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const searchParams = useSearchParams();
//   const dataParams = searchParams.getAll("data");

//   if (dataParams.length > 0) {
//     const data = decodeURIComponent(dataParams[0]);
//     const;
//   }
// }

export default function detailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [book, setBook] = useState<PictureBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Received ID:", id);
    if (!id) return;

    const fetchBook = async () => {
      const docRef = doc(db, "picturebooks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBook({ id: docSnap.id, ...docSnap.data() } as PictureBook);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };
    fetchBook();
  }, [id]);
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <h1>{book.title}</h1>
      </div>
    </>
  );
}
