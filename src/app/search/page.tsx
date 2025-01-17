"use client";
// import類
import styles from "./Search.module.scss";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// import類：画像
import back from "../../../public/img/back_question.svg";
import next from "../../../public/img/next_question.svg";
import reset from "../../../public/img/reset_answer.svg";
import searcharacter from "../../../public/img/character_1.svg";
import searcharacter_mindBlow from "../../../public/img/character_2.svg";
import searcharacter_thinking from "../../../public/img/character_3.svg";

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

const images = [searcharacter, searcharacter_mindBlow, searcharacter_thinking];

export default function Search() {
  // キャラクターの画像
  // 質問進む・戻るの処理の状態はそのまま
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // 現在の質問データ
  const currentQuestion = questions[currentQuestionIndex];

  // 画像の状態を管理（初期値としてランダムに画像を設定）
  //1
  // const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(
    null
  );
  // 画像をランダムに選ぶ関数
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  };

  // 質問進む
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      getRandomImage(); // 次の質問に進むたびに画像をランダムに変更
    }
  };

  // 質問戻る
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      getRandomImage(); // 前の質問に戻るたびに画像をランダムに変更
    }
  };

  // 初回レンダリング時にもランダム画像を設定
  useEffect(() => {
    getRandomImage();
  }, []);

  // リセットボタン
  const handleReset = () => {
    setCurrentQuestionIndex(0); // 質問を最初に戻す
    setSelectedOptions([]); // 選択されたオプションをリセット
    getRandomImage(); // 画像もリセット
  };

  // ?
  // オプション選択時の処理
  const handleOptionSelect = (value: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = value;
    setSelectedOptions(updatedOptions);
  };

  // 絵本データ取得
  const [fullDatas, setFullDatas] = useState<PictureBook[]>([]);
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

  // 絞り込みロジック
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

  //
  const router = useRouter();
  const handleSearch = () => {
    if (filteredDatas.length > 0) {
      // 絞り込まれたデータを sessionStorage に保存
      sessionStorage.setItem("filteredData", JSON.stringify(filteredDatas));
      // URL にデータを含めず遷移
      router.push(`/search/result`);
    } else {
      console.log("選択されたデータがありません");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.questionWrap}>
        <div className={styles.questionTop}>
          <div className={styles.question}>
            <p>{currentQuestion.question}</p>
          </div>
          <button onClick={handleReset}>
            <Image src={reset} alt="リセットボタン" />
            <p>リセット</p>
          </button>
        </div>
        <div className={styles.character}>
          {currentImage && <Image src={currentImage} alt="探すよ君の状態" />}
        </div>
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
        <button className={styles.searchBtn} onClick={handleSearch}>
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
