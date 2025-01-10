"use client";

import { useEffect, useState } from "react";
import detailStyles from "./ResultDetail.module.scss";
import styles from "../../Result.module.scss";
import { useRouter } from "next/router";

//firesbase
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

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
