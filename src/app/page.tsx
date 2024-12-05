"use client";
import { useState } from "react";
import { questions } from "../app/data/questions";
import { searchBooks } from "../app/utils/firebaseQueries";
import styles from "./page.module.scss";
import Header from "./components/Header";
import Link from "next/link";

// 型定義
interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

interface Book {
  id: string;
  title: string;
  ageGroup: string;
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Book[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionValue: string) => {
    const questionId = questions[currentQuestionIndex].id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));

    setSelectedOption(optionValue);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null); // 次の質問に移るときに選択をリセット
    } else {
      fetchResults({ ...answers, [questionId]: optionValue });
    }
  };

  const fetchResults = async (filters: Record<string, string>) => {
    const books = await searchBooks(filters);
    setResults(books);
  };

  return (
    <>
      <Header />
      <div className={styles.questionWrap}>
        <div className={styles.question}>
          <p>{questions[currentQuestionIndex].question}</p>
        </div>
        <div className={styles.cat}></div>
      </div>
      <div className={styles.answerWrap}>
        <ul>
          {questions[currentQuestionIndex].options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={selectedOption === option.value ? "selected" : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.btnWrap}>
        <button>
          <Link href="#">戻る</Link>
        </button>
        <button>
          <Link href="/test-result">
            <span>見つかった絵本(13冊)</span>検索
          </Link>
        </button>
        <button>
          <Link href="">次へ</Link>
        </button>
      </div>
    </>
  );
}
