"use client";

import Link from "next/link";
import styles from "./Result.module.scss";
import { usePathname } from "next/navigation";

export default function Result() {
  const pathname = usePathname();

  //ダミーデータ（あとからfirebaseから取得）
  const ResultDatas = [
    {
      id: 1,
      title: "桃太郎",
      writer: "不明",
      illustrator: "不明",
      livingThing: ["人間", "陸の生き物", "空の生き物"],
      mainCharacter: "桃太郎",
      character: [
        "桃太郎",
        "犬",
        "猿",
        "キジ",
        "鬼",
        "おじいさん",
        "おばあさん",
      ],
      genre: "昔話",
      location: "日本",
      hue: "不明",
      atmosphere: "",
      season: "不明",
    },
    {
      id: 2,
      title: "赤ずきん",
      writer: "不明",
      illustrator: "不明",
      livingThing: ["人間", "陸の生き物", "空の生き物"],
      mainCharacter: "赤ずきん",
      character: ["赤ずきん", "おばあさん", "オオカミ"],
      hue: "不明",
      atmosphere: ["かわいい", "怖い"],
      genre: "昔話",
      location: "海外",
      season: "不明",
    },
  ];
  return (
    <>
      <h1>本を探す</h1>

      <div className={styles.resultContainer}>
        <h2 className="resultTitle">検索結果</h2>
        <ul className={styles.resultList}>
          {ResultDatas.map((result) => (
            <li key={result.id} style={styles.resultListItem}>
              <h3 className="title">{result.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
