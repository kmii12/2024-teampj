// "use client";

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// // import firebase from "../../firebase/firebaseConfig"; // Firebaseの設定をインポート

// const ResultDetail = () => {
//   const router = useRouter();
//   const { id } = router.query; // URLから動的なIDを取得

//   const [resultDetails, setResultDetails] = useState(null); //本のデータを保存するstate

//   //ダミーデータ（あとからfirebaseから取得）
//   const ResultDatas = [
//     {
//       id: 1,
//       title: "桃太郎",
//       writer: "不明",
//       illustrator: "不明",
//       image: "",
//       livingThing: ["人間", "陸の生き物", "空の生き物"],
//       mainCharacter: "桃太郎",
//       character: [
//         "桃太郎",
//         "犬",
//         "猿",
//         "キジ",
//         "鬼",
//         "おじいさん",
//         "おばあさん",
//       ],
//       genre: "昔話",
//       location: "日本",
//       hue: "不明",
//       atmosphere: "",
//       season: "不明",
//     },
//     {
//       id: 2,
//       title: "赤ずきん",
//       writer: "不明",
//       illustrator: "不明",
//       image: "",
//       livingThing: ["人間", "陸の生き物", "空の生き物"],
//       mainCharacter: "赤ずきん",
//       character: ["赤ずきん", "おばあさん", "オオカミ"],
//       hue: "不明",
//       atmosphere: ["かわいい", "怖い"],
//       genre: "昔話",
//       location: "海外",
//       season: "不明",
//     },
//     {
//       id: 3,
//       title: "シンデレラ",
//       writer: "不明",
//       illustrator: "不明",
//       livingThing: "人間",
//       mainCharacter: "シンデレラ",
//       character: ["シンデレラ", "王子", "魔法使い"],
//       genre: "昔話",
//       location: "海外",
//       hue: "不明",
//       atmosphere: "",
//       season: "不明",
//     },
//     {
//       id: 4,
//       title: "白雪姫",
//       writer: "不明",
//       illustrator: "不明",
//       livingThing: ["人間", "陸の生き物"],
//       mainCharacter: "白雪姫",
//       character: ["白雪姫", "王子", "魔女", "小人"],
//       genre: "昔話",
//       location: "海外",
//       hue: "不明",
//       atmosphere: "",
//       season: "不明",
//     },
//     {
//       id: 5,
//       title: "アラジンと魔法のランプ",
//       writer: "不明",
//       illustrator: "不明",
//       livingThing: ["人間", "陸の生き物"],
//       mainCharacter: "アラジン",
//       character: ["アラジン", "ジーニー", "王女", "魔法使い", "盗賊"],
//       genre: "昔話",
//       location: "海外",
//       hue: "不明",
//       atmosphere: "",
//       season: "不明",
//     },
//   ];

//   useEffect(() => {
//     // idがまだundefinedの状態では処理しないようにする
//     if (id) {
//       const foundDetail = ResultDatas.find((item) => item.id == id); // idでデータを検索
//       setResultDetails(foundDetail);
//     }
//   }, [id]);

//   if (!resultDetails) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>{resultDetails.title}</h1>
//     </div>
//   );
// };
// export default ResultDetail;

"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ResultData {
  id: number;
  title: string;
  writer: string;
  illustrator: string;
  image: string;
  livingThing: string[];
  mainCharacter: string;
  character: string[];
  genre: string;
  location: string;
  hue: string;
  atmosphere: string[];
  season: string;
}

const ResultDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // URLから動的なIDを取得

  const [resultDetails, setResultDetails] = useState<ResultData | null>(null); // 本のデータを保存するstate

  // ダミーデータ（あとからfirebaseから取得）
  const ResultDatas: ResultData[] = [
    {
      id: 1,
      title: "桃太郎",
      writer: "不明",
      illustrator: "不明",
      image: "",
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
      atmosphere: [],
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
      image: "",
      livingThing: ["人間"],
      mainCharacter: "シンデレラ",
      character: ["シンデレラ", "王子", "魔法使い"],
      genre: "昔話",
      location: "海外",
      hue: "不明",
      atmosphere: [],
      season: "不明",
    },
    {
      id: 4,
      title: "白雪姫",
      writer: "不明",
      illustrator: "不明",
      image: "",
      livingThing: ["人間", "陸の生き物"],
      mainCharacter: "白雪姫",
      character: ["白雪姫", "王子", "魔女", "小人"],
      genre: "昔話",
      location: "海外",
      hue: "不明",
      atmosphere: [],
      season: "不明",
    },
    {
      id: 5,
      title: "アラジンと魔法のランプ",
      writer: "不明",
      illustrator: "不明",
      image: "",
      livingThing: ["人間", "陸の生き物"],
      mainCharacter: "アラジン",
      character: ["アラジン", "ジーニー", "王女", "魔法使い", "盗賊"],
      genre: "昔話",
      location: "海外",
      hue: "不明",
      atmosphere: [],
      season: "不明",
    },
  ];

  useEffect(() => {
    // idがまだundefinedの状態では処理しないようにする
    if (id) {
      const numericId = parseInt(id as string, 10); // idを数値に変換
      const foundDetail = ResultDatas.find((item) => item.id === numericId); // idでデータを検索
      setResultDetails(foundDetail || null); // 見つからなかった場合はnullを設定
    }
  }, [id]);

  if (!resultDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{resultDetails.title}</h1>
      <p>作者: {resultDetails.writer}</p>
      <p>絵: {resultDetails.illustrator}</p>

      {/* 必要に応じて他の情報も表示 */}
    </div>
  );
};

export default ResultDetail;
