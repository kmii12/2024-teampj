"use client";
import styles from "./page.module.scss";
import Header from "./components/Header";
import Link from "next/link";
import { questions } from "./data/questions";
import { useState } from "react";

export default function Home() {
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
