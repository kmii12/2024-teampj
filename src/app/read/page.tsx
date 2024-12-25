"use client";
import { useEffect, useState } from "react";
import Portrait from "../components/Portrait";
import styles from "./Read.module.scss";
import Image from "next/image";
import close from "../../../public/img/close.svg";

const Read: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  // 向きの変更を監視
  useEffect(() => {
    const updateOrientation = () => {
      const orientation = window.screen.orientation || {};
      setIsLandscape(orientation.type.includes("landscape"));
    };

    // 初期向きを確認
    updateOrientation();

    // イベントリスナーを追加
    window.addEventListener("orientationchange", updateOrientation);

    // クリーンアップ
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return (
    <div>
      {isLandscape ? (
        // 画面横向き
        <div className={styles.container}>
          <div className={styles.btnWrap}>
            <button className={styles.closeBtn}>
              <Image src={close} alt="閉じる" />
            </button>
            <button className={styles.lockBtn}>ロック解除中</button>
          </div>
          <nav className={styles.tab}>
            <ul>
              <li>ももいけいこ</li>
              <li>ひかる</li>
              <li>ひかりん</li>
            </ul>
          </nav>
          <div className={styles.pictureBooksWrap}>
            <ul>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
              <li>
                <p>シンデレラ</p>
                <Image
                  src="/img/cinderella.jpeg"
                  alt="シンデレラの絵本の写真"
                  width={80}
                  height={80}
                />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // 画面縦向き
        <Portrait />
      )}
    </div>
  );
};

export default Read;
