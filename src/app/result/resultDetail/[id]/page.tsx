"use client";

import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

import detailStyles from "./ResultDetail.module.scss";
import styles from "../../Result.module.scss";
// import Link from "next/link";

//firesbase
// import { db } from "@/firebase";
// import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
// import { serialize } from "v8";

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

export default function ResultDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const searchParams = useSearchParams();
  const dataParam = searchParams.getAll("data");

  if (dataParam.length > 0) {
    const data = decodeURIComponent(dataParam[0]);
    const filteredDatas: PictureBook[] = JSON.parse(data);
  }

  const resolvedParams = use(params); // Promise を解決
  console.log("選択した絵本のid:", resolvedParams);
  const [selectedItem, setSelectedItem] = useState<PictureBook | null>(null);

  const data = searchParams.get("data");

  useEffect(() => {
    if (data) {
      try {
        console.log("選択した絵本データ", JSON.parse(decodeURIComponent(data)));

        const filteredDatas: PictureBook[] = data
          ? JSON.parse(decodeURIComponent(data))
          : [];

        //多分元々数値やけど変換
        const resolvedId = Number(resolvedParams.id);
        console.log("データ内のID", resolvedId);

        //配列で返ってきてたクエリからのIDを数値に変換
        console.log(
          "クエリで渡されたID",
          filteredDatas.map((item) => Number(item.id))
        );

        // 数値として比較
        const item = filteredDatas.find(
          (item) => Number(item.id) === resolvedId
        );
        console.log("選択したアイテム:", item);

        setSelectedItem(item || null);
      } catch (error) {
        console.log("error");
        console.error("Failed to parse data:", error);
      }
    }
  }, [data, resolvedParams.id]);

  if (!selectedItem) {
    return <div>データが見つかりませんでした</div>;
  }

  return (
    <>
      <div className={styles.resultContainer}>
        <div className={detailStyles.detailTtlWrap}>
          <div className={detailStyles.itemImageWrap}>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className={selectedItem.image}
            />
          </div>
          <div className={detailStyles.itemDescriptionWrap}>
            <h1 className="title">
              <span className={detailStyles.smallLabel}>題名</span>
              {selectedItem.title}
            </h1>
            <div className={detailStyles.fixedBottom}>
              <p className="writer">作者　{selectedItem.writer}</p>
              <p className="illustrator">絵　{selectedItem.illustrator}</p>
              <p className="">出版社　{selectedItem.illustrator}</p>
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
}
