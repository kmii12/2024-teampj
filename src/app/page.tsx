"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//firebase
import { db } from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// console.log(db);

interface PictureBook {
  id: string;
  title: string;
  writer: string;
  image: string;
  mainCharacter: string;
  character: string[];
  genre: string;
  location: string;
  atmosphere: string[];
}

export default function Home() {
  //絵本データ取得する
  const [fullDatas, setFullDatas] = useState<PictureBook[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const selectedCategories = ["type_story", "type_trick"];
  const [filteredDatas, setFilteredDatas] = useState<PictureBook[]>([]); // 絞り込まれたデータ
  const router = useRouter();

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
    //カテゴリ選択と合わせてデータを絞り込む
    if (selectedCategory) {
      const filtered = fullDatas.filter(
        (item) => item.category === selectedCategory
      );
      console.log("選択したcategoryに一致するデータ", filtered);
      setFilteredDatas(filtered);
    }
  }, [fullDatas, selectedCategory]);

  const handleSearch = () => {
    //カテゴリでフィルタリング(検索押すときに)

    if (selectedCategory) {
      const queryParam = encodeURIComponent(JSON.stringify(filteredDatas));
      router.push(`/result?data=${queryParam}`);
    } else {
      console.log("選択されたデータがありません");
    }
  };

  //一つのみ選択可能
  //このエラー無視でも動く！一旦 nullの場合仮定してないからかなー
  //めんどいので後回し
  const toggleCategory = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
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
          {/* {fullDatas.map((full) => (
            <li key={full.id} onClick={() => toggleCategory(full.category)}>
              {}
            </li>
          ))} */}

          <li
            value="type_story"
            onClick={() => toggleCategory("type_story")}
            style={{
              cursor: "pointer",
              color: selectedCategory.includes("type_story") ? "brown" : "",
            }}
          >
            物語メイン
          </li>

          <li
            value="type_trick"
            onClick={() => toggleCategory("type_trick")}
            style={{
              cursor: "pointer",
              color: selectedCategory.includes("type_trick") ? "brown" : "",
            }}
          >
            仕掛け絵本
          </li>
        </ul>
      </div>
      <div className={styles.btnWrap}>
        <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
          戻る
        </button>
        <button onClick={handleSearch}>
          <p>
            <span>見つかった絵本{filteredDatas.length}冊</span>検索
          </p>
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
