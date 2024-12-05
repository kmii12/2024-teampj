// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import detailStyles from "./ResultDetail.module.scss";
// import styles from "../../Result.module.scss";
// import Link from "next/link";

// interface ResultData {
//   id: number;
//   title: string;
//   writer: string;
//   illustrator: string;
//   image: string;
//   livingThing: string[];
//   mainCharacter: string;
//   character: string[];
//   genre: string;
//   location: string;
//   hue: string;
//   atmosphere: string[];
//   season: string;
// }

// const ResultDetail: React.FC = () => {
//   const { id } = useParams(); // URLから動的なIDを取得

//   const [resultDetails, setResultDetails] = useState<ResultData | null>(null); // 本のデータを保存するstate

//   // ダミーデータ（あとからfirebaseから取得）
//   const ResultDatas: ResultData[] = [
//     {
//       id: 1,
//       title: "桃太郎",
//       writer: "不明",
//       illustrator: "不明",
//       image: "/img/momotaro.jpeg",
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
//       image: "/img/littleRedRidingHood.jpeg",
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
//       image: "/img/cinderella.jpeg",
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
//       image: "/img/snowWhite.jpeg",
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
//       image: "/img/aladdin.jpeg",
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
//       const numericId = parseInt(id, 10); // idを数値に変換
//       const foundDetail = ResultDatas.find((item) => item.id === numericId); // idでデータを検索
//       setResultDetails(foundDetail || null); // 見つからなかった場合はnullを設定
//     }
//   }, [id]);

//   if (!resultDetails) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div className={styles.resultContainer}>
//         <div className={detailStyles.detailTtlWrap}>
//           <div className={detailStyles.itemImageWrap}>
//             <img
//               src={resultDetails.image}
//               alt={resultDetails.title}
//               className={detailStyles.image}
//             />
//           </div>
//           <div className={detailStyles.itemDescriptionWrap}>
//             <h1 className="title">
//               <span className={detailStyles.smallLabel}>題名</span>
//               {resultDetails.title}
//             </h1>
//             <div className={detailStyles.fixedBottom}>
//               <p className="writer">作者　{resultDetails.writer}</p>
//               <p className="illustrator">絵　{resultDetails.illustrator}</p>
//               <p className="">出版社　{resultDetails.illustrator}</p>
//             </div>
//           </div>
//         </div>

//         <div className={detailStyles.descriptionContainer}>
//           <h2 className={detailStyles.summary}>あらすじ</h2>
//           <p className={detailStyles.summaryTxt}>
//             むかしむかし、ある国に、シンデレラという
//             女の子がいました。やさしいお父さんが亡くなり、
//             シンデレラは、いじわるなまま母とふたりの姉に
//             こき使われる毎日を過ごしていました。
//             そんなある日、妖精のおばあさんがあらわれ、
//             シンデレラはあこがれの舞踏会へ行くことになり……
//           </p>
//         </div>

//         <div className={detailStyles.btnWrap}>
//           <button type="button" className={detailStyles.storageBtn}>
//             保存
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResultDetail;

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import detailStyles from "./ResultDetail.module.scss";
import styles from "../../Result.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

//firesbase
import { db } from "@/firebase";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

interface ResultData {
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

const ResultDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URLパラメータからidを取得

  const [resultDetails, setResultDetails] = useState<ResultData | null>(null); // 本のデータを保存するstate

  // ダミーデータ（あとからfirebaseから取得）
  // const ResultDatas: ResultData[] = [
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

  // useEffect(() => {
  //   // idがまだundefinedの状態では処理しないようにする
  //   if (id) {
  //     const numericId = parseInt(id, 10); // idを数値に変換
  //     const foundDetail = ResultDatas.find((item) => item.id === numericId); // idでデータを検索
  //     setResultDetails(foundDetail || null); // 見つからなかった場合はnullを設定
  //   }
  // }, [id]);
  useEffect(() => {
    const fetchPictureBook = async () => {
      if (!id) return;
      const docRef = doc(db, "picturebooks", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResultDetails({ id: docSnap.id, ...docSnap.data() } as ResultData);
      } else {
        console.log("No such document!");
      }
    };
    fetchPictureBook();
  }, [id]);

  if (!resultDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.resultContainer}>
        <div className={detailStyles.detailTtlWrap}>
          <div className={detailStyles.itemImageWrap}>
            <img
              src={resultDetails.image}
              alt={resultDetails.title}
              className={detailStyles.image}
            />
          </div>
          <div className={detailStyles.itemDescriptionWrap}>
            <h1 className="title">
              <span className={detailStyles.smallLabel}>題名</span>
              {resultDetails.title}
            </h1>
            <div className={detailStyles.fixedBottom}>
              <p className="writer">作者　{resultDetails.writer}</p>
              <p className="illustrator">絵　{resultDetails.illustrator}</p>
              <p className="">出版社　{resultDetails.illustrator}</p>
            </div>
          </div>
        </div>

        <div className={detailStyles.descriptionContainer}>
          <h2 className={detailStyles.summary}>あらすじ</h2>
          <p className={detailStyles.summaryTxt}>
            むかしむかし、ある国に、シンデレラという
            女の子がいました。やさしいお父さんが亡くなり、
            シンデレラは、いじわるなまま母とふたりの姉に
            こき使われる毎日を過ごしていました。
            そんなある日、妖精のおばあさんがあらわれ、
            シンデレラはあこがれの舞踏会へ行くことになり……
          </p>
        </div>

        <div className={detailStyles.btnWrap}>
          <button type="button" className={detailStyles.storageBtn}>
            保存
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultDetail;
