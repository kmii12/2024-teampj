"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Result.module.scss";
import Image from "next/image";
import character from "../../../../public/img/character_result.svg";

interface PictureBook {
  id: number;
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

export default function Result() {
  const router = useRouter();
  const [filteredDatas, setFilteredDatas] = useState<PictureBook[]>([]);

  useEffect(() => {
    const data =
      typeof window !== "undefined"
        ? sessionStorage.getItem("filteredData")
        : null;
    if (data) {
      setFilteredDatas(JSON.parse(data));
    }
  }, []);

  if (!filteredDatas.length) {
    return <p>データが見つかりませんでした。</p>;
  }

  return (
    <main className={styles.resultContainer}>
      <div className={styles.resultHeader}>
        <Image src={character} alt="キャラクター" />
        <h2 className={styles.resultTitle}>
          検索結果は<span>{filteredDatas.length}</span>件です!
        </h2>
      </div>

      <ul className={styles.resultList}>
        {filteredDatas.map((result) => (
          <li key={result.id} className={styles.resultItem}>
            <button
              className={styles.resultButton}
              onClick={() => {
                router.push(`/search/result/resultDetail/${result.id}`);
              }}
            >
              <div className={styles.resultItemWrap}>
                <div className={styles.itemImageWrap}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={result.img}
                      alt={result.title}
                      width={200}
                      height={200}
                      className={styles.image}
                    />
                  </div>
                </div>
                <div className={styles.itemDescriptionWrap}>
                  <h3>{result.title}</h3>
                  <div className={styles.summaryContainer}>
                    <h4>あらすじ</h4>
                    <p>{result.summary}</p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
