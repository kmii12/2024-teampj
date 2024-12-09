"use client";
import styles from "./page.module.scss";
import Header from "./components/Header";
import Link from "next/link";
import { questions } from "./data/questions";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の質問インデックス
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 選択されたオプションを管理
  const [bookCount, setBookCount] = useState<number>(0); // 見つかった絵本の冊数

  // 現在の質問データ
  const currentQuestion = questions[currentQuestionIndex];

  // Firestoreから絵本のデータを取得
  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, "picturebooks");
      // const q = query(booksCollection); // クエリの条件を追加する場合

      const querySnapshot = await getDocs(booksCollection);
      const books = querySnapshot.docs.map((doc) => doc.data());
      console.log(books); // 取得したデータをログに出力

      setBookCount(querySnapshot.size); // 絵本の冊数を保存
    } catch (error) {
      console.error("Firestoreからデータを取得できませんでした:", error);
    }
  };

  //みき編集中
  // const fetchBooks = async () => {
  //   try {
  //     const booksCollection = collection(db, "picturebooks");
  //     console.log(booksCollection);

  //     // const q = query(booksCollection); // クエリの条件を追加する場合

  //     const querySnapshot = await getDocs(booksCollection);
  //     const books = querySnapshot.docs.map((doc) => doc.data());
  //     console.log(books); // 取得したデータをログに出力

  //     // setBookCount(querySnapshot.size); // 絵本の冊数を保存
  //   } catch (error) {
  //     console.log(db);

  //     console.error("Firestoreからデータを取得できませんでした:", error);
  //   }
  // };

  // console.log(db);

  // ページロード時にFirestoreデータを取得
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "picturebooks"));
      console.log(querySnapshot);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("絵本データ:", data);
    };
    fetchData();
    fetchBooks();
  }, []);

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
          <Link href="/test-result">
            <span>見つかった絵本({bookCount}冊)</span>検索
            {/* <span>見つかった絵本(5冊)</span>検索 */}
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
