"use client";
// import類
import styles from "./Search.module.scss";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";

// import類：画像
import back from "../../../public/img/back_question.svg";
import next from "../../../public/img/next_question.svg";

// import類：質問リスト
import { questions } from "../data/questions";

// //import類：firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface PictureBook {
  id: string;
  title: string;
  writer: string;
  img: string;
  mainCharacter: string;
  character: string[];
  genre: string;
  location: string;
  category: string[];
}

export default function Search() {
  // 質問リスト
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

  // //絵本データ取得する
  const [fullDatas, setFullDatas] = useState<PictureBook[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredDatas, setFilteredDatas] = useState<PictureBook[]>([]); // 絞り込まれたデータ

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "picturebooks"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PictureBook[];
      console.log("絵本データ", data);
      setFullDatas(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 選択されたオプションに基づいてデータを絞り込む
    if (selectedOptions.length > 0) {
      const filtered = fullDatas.filter((item) =>
        selectedOptions.every((selectedOption) =>
          item.category.includes(selectedOption)
        )
      );
      setFilteredDatas(filtered);
      console.log("絞り込まれたデータ:", filtered);
    } else {
      setFilteredDatas(fullDatas); // デフォルトですべて表示
    }
  }, [selectedOptions, fullDatas]);

  return (
    <>
      <Header />
      <div className={styles.questionWrap}>
        <div className={styles.question}>
          <p>{currentQuestion.question}</p>
        </div>
        <div className={styles.character}></div>
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
          <Image src={back} alt="前の質問に戻る" />
        </button>
        <button className={styles.searchBtn}>
          <p>
            見つかった絵本
            <br />(<span>{filteredDatas.length}</span>冊)
          </p>
          <p>検索</p>
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <Image src={next} alt="次の質問に進む" />
        </button>
      </div>
    </>
  );
}
