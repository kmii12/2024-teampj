"use client";
import styles from "./page.module.scss";
import Header from "./components/Header";
import Link from "next/link";
import { questions } from "./data/questions";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export default function Home() {
  // firebase
  // Firebaseデータ取得用ステート
  const [picturebooks, setPicturebooks] = useState<any[]>([]);
  useEffect(() => {
    // Firebaseからデータを取得する非同期関数
    const fetchPicturebooks = async () => {
      try {
        const q = query(collection(db, "picturebooks"));
        const querySnapshot = await getDocs(q);
        const books: any[] = [];
        querySnapshot.forEach((doc) => {
          // doc.data() は常に定義されています
          books.push({ id: doc.id, ...doc.data() });
        });
        setPicturebooks(books); // ステートにデータを保存
        console.log("Books fetched:", books);
      } catch (error) {
        console.error("Error fetching picturebooks:", error);
      }
    };

    fetchPicturebooks(); // 非同期関数を呼び出し
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  // 回答選択・質問進む戻る
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の質問インデックス
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 選択されたオプションを管理

  // 現在の質問データ
  const currentQuestion = questions[currentQuestionIndex];

  // オプション選択時の処理
  const handleOptionSelect = (value: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = value;
    setSelectedOptions(updatedOptions);
  };

  // 次の質問へ進む
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 前の質問に戻る
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.questionWrap}>
        <div className={styles.question}>
          <p>{currentQuestion.question}</p>
        </div>
        <div className={styles.cat}></div>
      </div>
      <div className={styles.answerWrap}>
        <ul>
          {currentQuestion.options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={
                selectedOptions[currentQuestionIndex] === option.value
                  ? styles.selected
                  : ""
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.btnWrap}>
        <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
          戻る
        </button>
        <button>
          <Link href="/result">
            {/* <span>見つかった絵本({bookCount}冊)</span>検索 */}
            <span>見つかった絵本(5冊)</span>検索
          </Link>
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          次へ
        </button>
      </div>
    </>
  );
}
