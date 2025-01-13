"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import styles from "./ResultDetail.module.scss";
import back from "../../../../../../public/img/backPage.svg";

interface PictureBook {
  id: number;
  title: string;
  mainCharacter: string;
  character: string[];
  genre: string;
  location: string;
  img: string;
  category: string[];
  summary: string;
  // idページにだけ使用
  writer: string;
  illustrator: string;
}

export default function ResultDetail() {
  const router = useRouter();
  const params = useParams(); // `params` を取得
  const [detail, setDetail] = useState<PictureBook | null>(null); // データを状態として管理
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // クライアント側で `sessionStorage` からデータを取得
    if (params && params.id) {
      const data = sessionStorage.getItem("filteredData");
      if (data) {
        const pictureBooks: PictureBook[] = JSON.parse(data);
        const id = Number(params.id);
        const foundDetail = pictureBooks.find((item) => item.id === id);

        if (foundDetail) {
          setDetail(foundDetail);
        } else {
          setError("データが見つかりませんでした。");
        }
      } else {
        setError("データが見つかりませんでした。");
      }
    } else {
      setError("無効なIDが指定されました。");
    }
  }, [params]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!detail) {
    return <p>データを読み込んでいます...</p>; // ローディング状態を表示
  }

  return (
    <main className={styles.detailContainer}>
      <div className={styles.backBtnWrap}>
        <button onClick={() => router.back()}>
          <Image src={back} alt="前のページに戻る" />
          戻る
        </button>
      </div>
      <div className={styles.detailWrap}>
        <div className={styles.leftWrap}>
          <div className={styles.imgWrap}>
            <Image
              src={detail.img}
              alt={detail.title}
              width={200}
              height={130}
            />
          </div>
        </div>
        <div className={styles.rightWrap}>
          <h1>{detail.title}</h1>
          <ul>
            <li>作者：{detail.writer}</li>
            <li>絵：{detail.illustrator}</li>
          </ul>
        </div>
      </div>

      <h2 className={styles.summaryTtl}>あらすじ</h2>
      <p className={styles.summary}>{detail.summary}</p>
      <div className={styles.keepBtnWrap}>
        <button className={styles.keepBtn}>保存</button>
      </div>
    </main>
  );
}
