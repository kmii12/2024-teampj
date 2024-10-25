"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import firebase from "../../firebase/firebaseConfig"; // Firebaseの設定をインポート
import styles from "./BookDetail.module.scss";

const resultDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URLから動的なIDを取得

  //firebaseデータに置き換えるときに使う！
  // const [resultDetail, setResultDetail] = useState(null); //本のデータを保存するstate
};

//ダミーデータ（あとからfirebaseから取得）
const ResultDatas = [
  {
    id: 1,
    title: "桃太郎",
    writer: "不明",
    illustrator: "不明",
    image: "",
    livingThing: ["人間", "陸の生き物", "空の生き物"],
    mainCharacter: "桃太郎",
    character: ["桃太郎", "犬", "猿", "キジ", "鬼", "おじいさん", "おばあさん"],
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
    image: "",
    livingThing: ["人間", "陸の生き物", "空の生き物"],
    mainCharacter: "赤ずきん",
    character: ["赤ずきん", "おばあさん", "オオカミ"],
    hue: "不明",
    atmosphere: ["かわいい", "怖い"],
    genre: "昔話",
    location: "海外",
    season: "不明",
  },
  {
    id: 3,
    title: "シンデレラ",
    writer: "不明",
    illustrator: "不明",
    livingThing: "人間",
    mainCharacter: "シンデレラ",
    character: ["シンデレラ", "王子", "魔法使い"],
    genre: "昔話",
    location: "海外",
    hue: "不明",
    atmosphere: "",
    season: "不明",
  },
  {
    id: 4,
    title: "白雪姫",
    writer: "不明",
    illustrator: "不明",
    livingThing: ["人間", "陸の生き物"],
    mainCharacter: "白雪姫",
    character: ["白雪姫", "王子", "魔女", "小人"],
    genre: "昔話",
    location: "海外",
    hue: "不明",
    atmosphere: "",
    season: "不明",
  },
  {
    id: 5,
    title: "アラジンと魔法のランプ",
    writer: "不明",
    illustrator: "不明",
    livingThing: ["人間", "陸の生き物"],
    mainCharacter: "アラジン",
    character: ["アラジン", "ジーニー", "王女", "魔法使い", "盗賊"],
    genre: "昔話",
    location: "海外",
    hue: "不明",
    atmosphere: "",
    season: "不明",
  },
];

const Details = resultDetail.find((item) => item.ud == id);

if (!book) return <p>Loading...</p>;
