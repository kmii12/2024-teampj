"use client";

import Link from "next/link";
import styles from "./Result.module.scss";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "@/app/components/SearchBar";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";

//firesbase
// import { db } from "@/firebase";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

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

export default function Result() {
  const searchParams = useSearchParams();

  const data = searchParams.get("data");
  const filteredDatas: PictureBook[] = data
    ? JSON.parse(decodeURIComponent(data))
    : [];

  return (
    <>
      <Header />
      <div className={styles.searchBarWrap}>
        <SearchBar />
      </div>
      <main className={styles.resultContainer}>
        <h2 className={styles.resultTitle}>
          検索結果({filteredDatas.length}件)
        </h2>
        <ul className={styles.resultList}>
          <div className={styles.resultItemWrap}>
            {filteredDatas.map((result) => (
              <li key={result.id} className={styles.resultItem}>
                <Link
                  href={{
                    pathname: `/result/resultDetail/${result.id}`,
                    query: {
                      data: encodeURIComponent(JSON.stringify(filteredDatas)),
                    },
                  }}
                >
                  <div className={styles.resultItemWrap}>
                    <div className={styles.itemImageWrap}>
                      <div className={styles.imgWrap}>
                        {/* <img
                          src="../../../public/img/hanselAndGretel.jpeg"
                          // alt={result.title}
                          className={styles.image}
                        /> */}
                      </div>
                    </div>

                    <div className={styles.itemDescriptionWrap}>
                      <h3 className="title">{result.title}</h3>
                      <div className={styles.summaryContainer}>
                        <h4>あらすじ</h4>
                        <p className={styles.summary}>{result.summary}</p>
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

// "use client";

// import Link from "next/link";
// import styles from "./Result.module.scss";
// // import { usePathname } from "next/navigation";
// import SearchBar from "@/app/components/SearchBar";
// import Header from "@/app/components/Header";
// import { useEffect, useState } from "react";

// //firesbase
// import { db } from "@/firebase";

// // console.log(db);

// import { getFirestore, collection, getDocs } from "firebase/firestore";

// interface PictureBook {
//   id: string;
//   title: string;
//   writer: string;
//   image: string;
//   mainCharacter: string;
//   character: string[];
//   genre: string;
//   location: string;
//   atmosphere: string[];
// }

// export default function Result() {
//   // const pathname = usePathname();

//   //ダミーデータ（あとからfirebaseから取得）
//   // const ResultDatas = [
//   //   {
//   //     id: 1,
//   //     title: "桃太郎",
//   //     writer: "不明",
//   //     illustrator: "不明",
//   //     image: "/img/momotaro.jpeg",
//   //     livingThing: ["人間", "陸の生き物", "空の生き物"],
//   //     mainCharacter: "桃太郎",
//   //     character: [
//   //       "桃太郎",
//   //       "犬",
//   //       "猿",
//   //       "キジ",
//   //       "鬼",
//   //       "おじいさん",
//   //       "おばあさん",
//   //     ],
//   //     genre: "昔話",
//   //     location: "日本",
//   //     hue: "不明",
//   //     atmosphere: "",
//   //     season: "不明",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "赤ずきん",
//   //     writer: "不明",
//   //     illustrator: "不明",
//   //     image: "/img/littleRedRidingHood.jpeg",
//   //     livingThing: ["人間", "陸の生き物", "空の生き物"],
//   //     mainCharacter: "赤ずきん",
//   //     character: ["赤ずきん", "おばあさん", "オオカミ"],
//   //     hue: "不明",
//   //     atmosphere: ["かわいい", "怖い"],
//   //     genre: "昔話",
//   //     location: "海外",
//   //     season: "不明",
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "シンデレラ",
//   //     writer: "不明",
//   //     illustrator: "不明",
//   //     image: "/img/cinderella.jpeg",
//   //     livingThing: "人間",
//   //     mainCharacter: "シンデレラ",
//   //     character: ["シンデレラ", "王子", "魔法使い"],
//   //     genre: "昔話",
//   //     location: "海外",
//   //     hue: "不明",
//   //     atmosphere: "",
//   //     season: "不明",
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "白雪姫",
//   //     writer: "不明",
//   //     illustrator: "不明",
//   //     image: "/img/snowWhite.jpeg",
//   //     livingThing: ["人間", "陸の生き物"],
//   //     mainCharacter: "白雪姫",
//   //     character: ["白雪姫", "王子", "魔女", "小人"],
//   //     genre: "昔話",
//   //     location: "海外",
//   //     hue: "不明",
//   //     atmosphere: "",
//   //     season: "不明",
//   //   },
//   //   {
//   //     id: 5,
//   //     title: "アラジンと魔法のランプ",
//   //     writer: "不明",
//   //     illustrator: "不明",
//   //     image: "/img/aladdin.jpeg",
//   //     livingThing: ["人間", "陸の生き物"],
//   //     mainCharacter: "アラジン",
//   //     character: ["アラジン", "ジーニー", "王女", "魔法使い", "盗賊"],
//   //     genre: "昔話",
//   //     location: "海外",
//   //     hue: "不明",
//   //     atmosphere: "",
//   //     season: "不明",
//   //   },
//   // ];

//   //firebaseの絵本データ
//   const [resultDatas, setResultDates] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       //dbに picturebooksのコレクションを設定
//       const querySnapshot = await getDocs(collection(db, "picturebooks"));
//       // console.log(querySnapshot);
//       //dataに配列として挿入
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       console.log("絵本データ:", data);
//       setResultDates(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className={styles.searchBarWrap}>
//         <SearchBar />
//       </div>
//       <main className={styles.resultContainer}>
//         <h2 className={styles.resultTitle}>検索結果({resultDatas.length}件)</h2>
//         <ul className={styles.resultList}>
//           <div className={styles.resultItemWrap}>
//             {resultDatas.map((result) => (
//               <li key={result.id} className={styles.resultItem}>
//                 <Link href={`/result/resultDetail/${result.id}`}>
//                   <div className={styles.resultItemWrap}>
//                     <div className={styles.itemImageWrap}>
//                       <div className={styles.imgWrap}>
//                         {/* <img
//                           src="../../../public/img/hanselAndGretel.jpeg"
//                           // alt={result.title}
//                           className={styles.image}
//                         /> */}
//                       </div>
//                     </div>

//                     <div className={styles.itemDescriptionWrap}>
//                       <h3 className="title">{result.title}</h3>
//                       <div className={styles.summaryContainer}>
//                         <h4>あらすじ</h4>
//                         <p className={styles.summary}>{result.summary}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </div>
//         </ul>
//       </main>
//     </>
//   );
// }

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { PictureBook } from "../types/pictureBook";
// import data from "../data/pictureBook.json";
// import styles from "./Result.module.scss";
// import Header from "../components/Header";
// // import SearchBar from "../components/SearchBar";
// import Link from "next/link";
// import Image from "next/image";

// export default function Result() {
//   const searchParams = useSearchParams();
//   const [filteredBooks, setFilteredBooks] = useState<PictureBook[]>([]);

//   useEffect(() => {
//     const selectedKeywords = JSON.parse(
//       searchParams.get("selectedKeywords") || "{}"
//     );

//     // 絞り込みロジック：各キーワードカテゴリーに基づき、データをフィルタリング
//     const filteredBooksData = data.filter((book: PictureBook) => {
//       const matchesSeason =
//         selectedKeywords.seasons.length === 0 ||
//         selectedKeywords.seasons.includes(book.season);

//       const matchesLivingThing =
//         selectedKeywords.livingThings.length === 0 ||
//         (Array.isArray(book.livingThing) &&
//           book.livingThing.length > 0 &&
//           book.livingThing.some((thing) =>
//             selectedKeywords.livingThings.includes(thing)
//           ));

//       const matchesHue =
//         selectedKeywords.hue.length === 0 ||
//         selectedKeywords.hue.includes(book.hue);

//       const matchesAtmosphere =
//         selectedKeywords.atmosphere.length === 0 ||
//         (Array.isArray(book.atmosphere) &&
//           book.atmosphere.length > 0 &&
//           book.atmosphere.some((atm) =>
//             selectedKeywords.atmosphere.includes(atm)
//           ));

//       const matchesLocation =
//         selectedKeywords.locations.length === 0 ||
//         selectedKeywords.locations.includes(book.location);

//       const matchesFeature =
//         selectedKeywords.features.length === 0 ||
//         selectedKeywords.features.includes(book.feature);

//       return (
//         matchesSeason &&
//         matchesLivingThing &&
//         matchesHue &&
//         matchesAtmosphere &&
//         matchesLocation &&
//         matchesFeature
//       );
//     });

//     setFilteredBooks(filteredBooksData);
//   }, [searchParams]);

//   return (
//     <>
//       <Header />
//       <div className={styles.searchBarWrap}>
//         {/* <SearchBar searchText={initialSearchText} /> */}
//       </div>
//       <main className={styles.resultContainer}>
//         <h2 className={styles.resultTitle}>
//           検索結果({filteredBooks.length}件)
//         </h2>
//         <ul className={styles.resultList}>
//           <div className={styles.resultItemWrap}>
//             {filteredBooks.map((result) => (
//               <li key={result.id} className={styles.resultItem}>
//                 <Link href={`/result/resultDetail/${result.id}`}>
//                   <div className={styles.resultItemWrap}>
//                     <div className={styles.itemImageWrap}>
//                       <Image
//                         src={result.image}
//                         alt={result.title}
//                         className={styles.image}
//                         width={200}
//                         height={200}
//                       />
//                     </div>
//                     <div className={styles.itemDescriptionWrap}>
//                       <h3 className="title">題名　{result.title}</h3>
//                       <div className={styles.fixedBottom}>
//                         <p className="writer">作者　{result.writer}</p>
//                         <p className="illustrator">絵　{result.illustrator}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </div>
//         </ul>
//       </main>
//     </>
//   );
// }
