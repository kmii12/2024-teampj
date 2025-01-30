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
import { useEffect, useState } from "react";
import Image from "next/image";

//firesBase
import { db } from "@/firebase";

// console.log(db);

import { collection, getDocs } from "firebase/firestore";

interface PictureBook {
  id: string;
  title: string;
  img: string;
}

export default function SavedList() {
  //firebaseの絵本データ
  const [savedDatas, setSavedDates] = useState<
    { id: string; title: string; img: string }[]
  >([]);
  const [newSavedData, setNewSavedData] = useState<
    { id: string; title: string; img: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      //dbに picturebooksのコレクションを設定
      const querySnapshot = await getDocs(collection(db, "picturebooks"));
      // console.log(querySnapshot);
      //dataに配列として挿入
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.title ?? "タイトルなし", // title がない場合デフォルト値を設定
        img: doc.img ?? "/default.jpg", // img がない場合デフォルト画像を設定
        ...doc.data(),
      }));
      console.log("絵本データ:", data);
      setSavedDates(data);
      setNewSavedData(data);
    };
    fetchData();
  }, []);

  // 削除ボタンの処理
  const handleDelete = (id: string) => {
    // newSavedData から指定された id を持つアイテムを削除
    const updatedData = newSavedData.filter((item) => item.id !== id);
    setNewSavedData(updatedData); // 更新されたデータで状態を更新
  };

  if (!savedDatas) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.mainTitleWrap}>
        <h1 className={styles.mainTitle}>保存</h1>
      </div>
      <div className={styles.searchBarWrap}>
        <SearchBar />
        <div className={styles.sortIcon}></div>
      </div>
      <main className={styles.resultContainer}>
        <ul className={styles.resultList}>
          <div className={styles.resultItemWrap}>
            {newSavedData.map((savedItem) => (
              <li key={savedItem.id} className={styles.resultItem}>
                <div className={styles.resultItemCard}>
                  <h3>{savedItem.title}</h3>
                  <Link href={`/saved/${savedItem.id}`}>
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
                  </Link>
                  <button
                    onClick={() => handleDelete(savedItem.id)}
                    className={styles.deleteBtn}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </main>
    </>
  );
}
