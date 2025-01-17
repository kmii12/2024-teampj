// "use client";

// import Header from "../components/Header";
// // import SearchBar from "./components/SearchBar";
// import styles from "./saved.module.scss";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// //firebase
// import { db } from "@/firebase";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// export default function Saved() {
//   return (
//     <>
//       <Header />
//       <h1 className={styles.title}>保存</h1>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import styles from "./saved.module.scss";
// import { usePathname } from "next/navigation";
import SearchBar from "@/app/components/SearchBar";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";

//firesbase
import { db } from "@/firebase";

// console.log(db);

import { getFirestore, collection, getDocs } from "firebase/firestore";

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

export default function SavedList() {
  //firebaseの絵本データ
  const [savedDatas, setSavedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //dbに picturebooksのコレクションを設定
      const querySnapshot = await getDocs(collection(db, "picturebooks"));
      // console.log(querySnapshot);
      //dataに配列として挿入
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("絵本データ:", data);
      setSavedDates(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.mainTitleWrap}>
        <h1 className={styles.mainTitle}>保存</h1>
      </div>
      <div className={styles.searchBarWrap}>
        <SearchBar />
      </div>
      <main className={styles.resultContainer}>
        <ul className={styles.resultList}>
          <div className={styles.resultItemWrap}>
            {savedDatas.map((savedItem) => (
              <li key={savedItem.id} className={styles.resultItem}>
                <Link href={`/result/resultDetail/${savedItem.id}`}>
                  <div className={styles.resultItemCard}>
                    <h3>{savedItem.title}</h3>
                    <div className={styles.itemImageWrap}>
                      <div className={styles.imgWrap}>
                        <Image
                          src={savedItem.img}
                          alt={savedItem.title}
                          width={200}
                          height={200}
                          className={styles.image}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </main>
    </>
  );
}
