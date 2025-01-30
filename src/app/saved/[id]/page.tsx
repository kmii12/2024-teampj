"use client";

import Link from "next/link";
import styles from "./detail.module.scss";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { GetServerSideProps } from "next";

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
  summary: string;
  writer: string;
  img: string;
  mainCharacter: string;
  character: string[];
  category: string[];
  genre: string;
  location: string;
}

export default function detailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [book, setBook] = useState<PictureBook | null>(null);
  useEffect(() => {
    console.log("取得したID:", id);
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
      <header className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => window.history.back()}
        >
          戻る
        </button>
      </header>
      <div className={styles.bookContainer}>
        <div className={styles.imgBox}>
          <Image
            src={book.img}
            alt={book.title}
            width={140}
            height={140}
            className={styles.img}
          />
        </div>
        <div className={styles.txtFlexBox}>
          <h1 className={styles.bookTtl}>{book.title}</h1>
          <div className={styles.txtBottomBox}>
            <p>作者：{book.writer}</p>
            <p>ジャンル：{book.genre}</p>
            <p>主人公：{book.mainCharacter}</p>
          </div>
        </div>
      </div>
      <div className={styles.summaryContainer}>
        <h2>あらすじ</h2>
        <p className={styles.summaryTxt}>{book.summary}</p>
      </div>
    </>
  );
}
