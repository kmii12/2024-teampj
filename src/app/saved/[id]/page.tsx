"use client";

import Link from "next/link";
// import styles from "./saved.module.scss";
import SearchBar from "@/app/components/SearchBar";
import Header from "@/app/components/Header";
import { use, useEffect, useState } from "react";

import { useRouter } from "next/router";
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

export default function detailPage({ params }: { params: { id: number } }) {
  const { id } = params;
  // const id = use(params.id);

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

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { db } from "@/firebase";
// import {
//   doc,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";

// interface PictureBook {
//   id: string; // Firestore IDは文字列
//   title: string;
//   writer: string;
//   image: string;
//   mainCharacter: string;
//   character: string[];
//   genre: string;
//   location: string;
//   atmosphere: string[];
// }

// export default function DetailPage({ params }: { params: { id: string } }) {
//   const { id } = params;
//   const [book, setBook] = useState<PictureBook | null>(null);

//   useEffect(() => {
//     console.log("Received ID:", id);
//     if (!id) return;

//     const fetchBook = async () => {
//       const booksRef = collection(db, "picturebooks");
//       const q = query(booksRef, where("id", "==", id)); // IDを文字列として比較
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => {
//           setBook({ id: doc.id, ...doc.data() } as PictureBook);
//         });
//       } else {
//         console.log("No document found!");
//       }
//     };
//     fetchBook();
//   }, [id]);

//   if (!book) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div>
//         <h1>{book.title}</h1>
//         <p>{book.writer}</p>
//         <img src={book.image} alt={book.title} />
//       </div>
//     </>
//   );
// }
