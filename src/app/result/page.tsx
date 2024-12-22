"use client";

// import Link from "next/link";
import styles from "./Result.module.scss";
// import { usePathname } from "next/navigation";
// import SearchBar from "@/app/components/SearchBar";
import Header from "@/app/components/Header";
// import { useEffect, useState } from "react";
import { db } from "@/firebase";

//firesbase
console.log(db);

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

export default function Result() {
  // const pathname = usePathname();

  //ダミーデータ（あとからfirebaseから取得）
  // const ResultDatas = [
  //   {
  //     id: 1,
  //     title: "桃太郎",
  //     writer: "不明",
  //     illustrator: "不明",
  //     image: "/img/momotaro.jpeg",
  //     livingThing: ["人間", "陸の生き物", "空の生き物"],
  //     mainCharacter: "桃太郎",
  //     character: [
  //       "桃太郎",
  //       "犬",
  //       "猿",
  //       "キジ",
  //       "鬼",
  //       "おじいさん",
  //       "おばあさん",
  //     ],
  //     genre: "昔話",
  //     location: "日本",
  //     hue: "不明",
  //     atmosphere: "",
  //     season: "不明",
  //   },
  //   {
  //     id: 2,
  //     title: "赤ずきん",
  //     writer: "不明",
  //     illustrator: "不明",
  //     image: "/img/littleRedRidingHood.jpeg",
  //     livingThing: ["人間", "陸の生き物", "空の生き物"],
  //     mainCharacter: "赤ずきん",
  //     character: ["赤ずきん", "おばあさん", "オオカミ"],
  //     hue: "不明",
  //     atmosphere: ["かわいい", "怖い"],
  //     genre: "昔話",
  //     location: "海外",
  //     season: "不明",
  //   },
  //   {
  //     id: 3,
  //     title: "シンデレラ",
  //     writer: "不明",
  //     illustrator: "不明",
  //     image: "/img/cinderella.jpeg",
  //     livingThing: "人間",
  //     mainCharacter: "シンデレラ",
  //     character: ["シンデレラ", "王子", "魔法使い"],
  //     genre: "昔話",
  //     location: "海外",
  //     hue: "不明",
  //     atmosphere: "",
  //     season: "不明",
  //   },
  //   {
  //     id: 4,
  //     title: "白雪姫",
  //     writer: "不明",
  //     illustrator: "不明",
  //     image: "/img/snowWhite.jpeg",
  //     livingThing: ["人間", "陸の生き物"],
  //     mainCharacter: "白雪姫",
  //     character: ["白雪姫", "王子", "魔女", "小人"],
  //     genre: "昔話",
  //     location: "海外",
  //     hue: "不明",
  //     atmosphere: "",
  //     season: "不明",
  //   },
  //   {
  //     id: 5,
  //     title: "アラジンと魔法のランプ",
  //     writer: "不明",
  //     illustrator: "不明",
  //     image: "/img/aladdin.jpeg",
  //     livingThing: ["人間", "陸の生き物"],
  //     mainCharacter: "アラジン",
  //     character: ["アラジン", "ジーニー", "王女", "魔法使い", "盗賊"],
  //     genre: "昔話",
  //     location: "海外",
  //     hue: "不明",
  //     atmosphere: "",
  //     season: "不明",
  //   },
  // ];

  //firebaseの絵本データ
  // const [resultDatas, setResultDates] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //dbに picturebooksのコレクションを設定
  //     const querySnapshot = await getDocs(collection(db, "picturebooks"));
  //     // console.log(querySnapshot);
  //     //dataに配列として挿入
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log("絵本データ:", data);
  //     setResultDates(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Header />
      <div className={styles.searchBarWrap}>{/* <SearchBar /> */}</div>
      <main className={styles.resultContainer}>
        <h2 className={styles.resultTitle}>
          {/* 検索結果({resultDatas.length}件) */}
          検索結果(5件)
        </h2>
        <ul className={styles.resultList}>
          <div className={styles.resultItemWrap}>
            {/* {resultDatas.map((result) => (
              <li key={result.id} className={styles.resultItem}>
                <Link href={`/result/resultDetail/${result.id}`}>
                  <div className={styles.resultItemWrap}>
                    <div className={styles.itemImageWrap}>
                      <div className={styles.imgWrap}>
                        <img
                          src="../../../public/img/hanselAndGretel.jpeg"
                          // alt={result.title}
                          className={styles.image}
                        />
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
            ))} */}
          </div>
        </ul>
      </main>
    </>
  );
}
