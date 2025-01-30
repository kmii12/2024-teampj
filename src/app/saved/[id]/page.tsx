"use client";

import Link from "next/link";
// import styles from "./saved.module.scss";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

//firesBase
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

// { params }: { params: { id: number } }

export default function detailPage() {
  // const { id } = params;
  // // const id = use(params.id);
  const params = useParams(); // useParams でパラメータを取得
  const id = params?.id as string; // id を文字列として取得

  const [book, setBook] = useState<PictureBook | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Received ID:", id);
    if (!id) return;

    const fetchBook = async () => {
      const booksRef = collection(db, "picturebooks");
      const q = query(booksRef, where("id", "==", Number(id)));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setBook({ id: doc.id, ...doc.data() } as PictureBook);
        });
      } else {
        console.log("フィールドない");
      }
    };
    fetchBook();
  }, [id]);
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1>{book.title}</h1>
      </div>
    </>
  );
}
