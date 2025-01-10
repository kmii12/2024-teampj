"use client";

import styles from "./ResultDetail.module.scss";

// Firebase
import Image from "next/image";

interface resultData {
  id: string;
  title: string;
  writer: string;
  mainCharacter: string;
  character: string[];
  genre: string;
  location: string;
  img: string;
  category: string[];
  summary: string;
}

const ResultDetail = () => {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id"); // URLパラメータからidを取得

  // const [resultDetails, setResultDetails] = useState<ResultData | null>(null); // 本のデータを保存するstate

  // useEffect(() => {
  //   const fetchPictureBook = async () => {
  //     if (!id) return;
  //     const docRef = doc(db, "picturebooks", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setResultDetails({ id: docSnap.id, ...docSnap.data() } as ResultData);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };
  //   fetchPictureBook();
  // }, [id]);

  // useEffect(() => {
  //   console.log("Search Params ID:", id); // デバッグ用
  // }, [id]);

  // if (!resultDetails) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className={styles.resultContainer}>
      <div className={styles.detailTtlWrap}>
        <div className={styles.itemImageWrap}>
          <Image
            src={resultData.img}
            alt={resultData.title}
            width={200}
            height={200}
            className={styles.image}
          />
        </div>
        <div className={styles.itemDescriptionWrap}>
          <h1 className={styles.detailTtl}>
            <span className={styles.smallLabel}>題名</span>
            {resultData.title}
          </h1>
          <div className={styles.fixedBottom}>
            <p className="writer">作者：{resultData.writer}</p>
            <p className="illustrator">絵：{resultData.illustrator}</p>
            <p className="company">出版社：{resultData.company}</p>
          </div>
        </div>
      </div>

      <div className={styles.descriptionContainer}>
        <h2 className={styles.summary}>あらすじ</h2>
        <p className={styles.summaryTxt}>
          むかしむかし、ある国に、シンデレラという
          女の子がいました。やさしいお父さんが亡くなり、
          シンデレラは、いじわるなまま母とふたりの姉に
          こき使われる毎日を過ごしていました。
          そんなある日、妖精のおばあさんがあらわれ、
          シンデレラはあこがれの舞踏会へ行くことになり……
        </p>
      </div>

      <div className={styles.btnWrap}>
        <button type="button" className={styles.storageBtn}>
          保存
        </button>
      </div>
    </div>
  );
};

export default ResultDetail;
