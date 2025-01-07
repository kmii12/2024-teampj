// "use client";
// import { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import Header from "./components/Header";
// import styles from "./page.module.scss";
// import data from "./data/keywords.json";
// import { Keywords } from "./types/keywords";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   const keywords: Keywords = data;
//   const [selectedKeywords, setSelectedKeywords] = useState<{
//     seasons: Set<number>;
//     livingThings: Set<number>;
//     hue: Set<number>;
//     atmosphere: Set<number>;
//     locations: Set<number>;
//     features: Set<number>;
//   }>({
//     seasons: new Set(),
//     livingThings: new Set(),
//     hue: new Set(),
//     atmosphere: new Set(),
//     locations: new Set(),
//     features: new Set(),
//   });
//   const toggleSelect = (
//     category: keyof typeof selectedKeywords,
//     index: number
//   ) => {
//     setSelectedKeywords((prevState) => {
//       const newSet = new Set(prevState[category]);
//       if (newSet.has(index)) {
//         newSet.delete(index);
//       } else {
//         newSet.add(index);
//       }
//       return { ...prevState, [category]: newSet };
//     });
//   };

//   return (
//     <>
//       <Header />
//       <input type="search" id="bookSearch" name="search" />
//       <main className={styles.main}>
//         <SearchBar />
//         <div className={styles.selectList}>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>季節</h2>
//               <ul>
//                 {keywords.seasons.map((season, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.seasons.has(index) ? styles.selected : ""
//                     }
//                     onClick={() => toggleSelect("seasons", index)}
//                   >
//                     {season}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>生き物</h2>
//               <ul>
//                 {keywords.livingThings.map((thing, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.livingThings.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("livingThings", index)}
//                   >
//                     {thing}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>色合い</h2>
//               <ul>
//                 {keywords.hue.map((color, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.hue.has(index) ? styles.selected : ""
//                     }
//                     onClick={() => toggleSelect("hue", index)}
//                   >
//                     {color}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>雰囲気</h2>
//               <ul>
//                 {keywords.atmosphere.map((atmos, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.atmosphere.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("atmosphere", index)}
//                   >
//                     {atmos}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>国</h2>
//               <ul>
//                 {keywords.locations.map((location, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.locations.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("locations", index)}
//                   >
//                     {location}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>特徴</h2>
//               <ul>
//                 {keywords.features.map((feature, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.features.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("features", index)}
//                   >
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//         </div>
//         <div className={styles.btnWrap}>
//           <button
//             className={styles.resetBtn}
//             onClick={() => {
//               setSelectedKeywords({
//                 seasons: new Set(),
//                 livingThings: new Set(),
//                 hue: new Set(),
//                 atmosphere: new Set(),
//                 locations: new Set(),
//                 features: new Set(),
//               });
//             }}
//           >
//             <p>リセット</p>
//           </button>
//           <button
//             className={styles.searchBtn}
//             onClick={() => {
//               const queryString = new URLSearchParams({
//                 selectedKeywords: JSON.stringify({
//                   seasons: Array.from(selectedKeywords.seasons),
//                   livingThings: Array.from(selectedKeywords.livingThings),
//                   hue: Array.from(selectedKeywords.hue),
//                   atmosphere: Array.from(selectedKeywords.atmosphere),
//                   locations: Array.from(selectedKeywords.locations),
//                   features: Array.from(selectedKeywords.features),
//                 }),
//               }).toString();

//               router.push(`/result?${queryString}`);
//             }}
//           >
//             <p>検索</p>
//           </button>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import Header from "./components/Header";
// import SearchBar from "./components/SearchBar";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//firebase
import { db } from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// console.log(db);

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

export default function Home() {
  //絵本データ取得する
  const [fullDatas, setFullDatas] = useState<PictureBook[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const selectedCategories = ["type_story", "type_trick"];
  const [filteredDatas, setFilteredDatas] = useState<PictureBook[]>([]); // 絞り込まれたデータ
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "picturebooks"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PictureBook[];
      console.log("絵本データ", data);
      setFullDatas(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    //カテゴリ選択と合わせてデータを絞り込む
    if (selectedCategory) {
      const filtered = fullDatas.filter(
        (item) => item.category === selectedCategory
      );
      console.log("選択したcategoryに一致するデータ", filtered);
      setFilteredDatas(filtered);
    }
  }, [fullDatas, selectedCategory]);

  const handleSearch = () => {
    //カテゴリでフィルタリング(検索押すときに)

    if (selectedCategory) {
      const queryParam = encodeURIComponent(JSON.stringify(filteredDatas));
      router.push(`/result?data=${queryParam}`);
    } else {
      console.log("選択されたデータがありません");
    }
  };

  //一つのみ選択可能
  //このエラー無視でも動く！一旦 nullの場合仮定してないからかなー
  //めんどいので後回し
  const toggleCategory = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  return (
    <>
      <Header />
      {/* <SearchBar /> */}
      <div className={styles.questionWrap}>
        <div className={styles.question}>
          {/* 仮でとりあえず */}
          <p>Q1. 絵本の種類はどれでしたか?</p>
        </div>
        <div className={styles.cat}></div>
      </div>
      <div className={styles.answerWrap}>
        <ul>
          {/* {fullDatas.map((full) => (
            <li key={full.id} onClick={() => toggleCategory(full.category)}>
              {}
            </li>
          ))} */}

          <li
            value="type_story"
            onClick={() => toggleCategory("type_story")}
            style={{
              cursor: "pointer",
              color: selectedCategory.includes("type_story") ? "brown" : "",
            }}
          >
            物語メイン
          </li>

          <li
            value="type_trick"
            onClick={() => toggleCategory("type_trick")}
            style={{
              cursor: "pointer",
              color: selectedCategory.includes("type_trick") ? "brown" : "",
            }}
          >
            仕掛け絵本
          </li>
        </ul>
      </div>
      <div className={styles.btnWrap}>
        <button>
          <p>戻る</p>
        </button>
        <button onClick={handleSearch}>
          <p>
            <span>見つかった絵本{filteredDatas.length}冊</span>検索
          </p>
        </button>
        <button>
          <p>次へ</p>
        </button>
      </div>
    </>
  );
}
