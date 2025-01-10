"use client";

import styles from "./Result.module.scss";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import character from "../../../../public/img/character_result.svg";
import { useEffect } from "react";

//firesbase
// import { db } from "@/firebase";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

interface PictureBook {
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

export default function Result() {
  const searchParams = useSearchParams();

  const data = searchParams.get("data");
  const filteredDatas: PictureBook[] = data
    ? JSON.parse(decodeURIComponent(data))
    : [];

  return (
    <>
      <main className={styles.resultContainer}>
        <div className={styles.resultHeader}>
          <Image src={character} alt="キャラクター" />
          <h2 className={styles.resultTitle}>
            検索結果は<span>{filteredDatas.length}</span>件です!
          </h2>
        </div>

        <ul className={styles.resultList}>
          <div className={styles.resultItemWrap}>
            {filteredDatas.map((result) => (
              <li key={result.id} className={styles.resultItem}>
                <button
                  className={styles.resultButton}
                  onClick={() =>
                    (window.location.href = `/search/result/resultDetail?id=${encodeURIComponent(
                      result.id
                    )}`)
                  }
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
                      <h3 className="title">{result.title}</h3>
                      <div className={styles.summaryContainer}>
                        <h4>あらすじ</h4>
                        <p className={styles.summary}>{result.summary}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </div>
        </ul>
      </main>
    </>
  );
}
