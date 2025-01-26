"use client";
import { useEffect, useState } from "react";
import Portrait from "../components/Portrait";
import styles from "./Read.module.scss";
import Image from "next/image";
import close from "../../../public/img/close.svg";

const Read: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1); // 1: 最初のタブ

  // 向きの変更を監視
  useEffect(() => {
    const updateOrientation = () => {
      const orientation = window.screen.orientation || {};
      setIsLandscape(orientation.type.includes("landscape"));
    };

    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

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
              {["ももいけいこ", "ひかる", "ひかりん"].map((tab, index) => (
                <li
                  key={index}
                  className={`${
                    activeTab === index + 1 ? styles.activeTab : ""
                  }`}
                  onClick={() => handleTabClick(index + 1)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.pictureBooksWrap}>
            <ul>
              {activeTab === 1 && (
                <>
                  <li>
                    <p>アラジン</p>
                    <Image
                      src="/img/aladdin.jpeg"
                      alt="アラジンの絵本の写真"
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
                </>
              )}
              {activeTab === 2 && (
                <>
                  <li>
                    <p>赤ずきん</p>
                    <Image
                      src="/img/littleRedRidingHood.jpeg"
                      alt="赤ずきんの絵本の写真"
                      width={80}
                      height={80}
                    />
                  </li>
                </>
              )}
              {activeTab === 3 && (
                <>
                  <li>
                    <p>白雪姫</p>
                    <Image
                      src="/img/snowwhite.jpeg"
                      alt="白雪姫の絵本の写真"
                      width={80}
                      height={80}
                    />
                  </li>
                </>
              )}
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
