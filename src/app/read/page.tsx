"use client";
import { useEffect, useState } from "react";
import Portrait from "../components/read/Portrait";
import styles from "./Read.module.scss";
import Image from "next/image";
import close from "../../../public/img/close.svg";
import Link from "next/link";
import Tab from "../components/read/Tab";
import Login from "../components/read/Login";

interface PictureBook {
  title: string;
  img: string;
  link?: string;
}

const Read: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isModalLogin, setIsModalLogin] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [lockedTab, setLockedTab] = useState<number | null>(null);

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

  const pictureBooks: { [key: number]: PictureBook[] } = {
    1: [
      { title: "アラジン", img: "/img/aladdin.jpg" },
      { title: "かぐや姫", img: "/img/kaguyahime.jpg" },
    ],
    2: [{ title: "桃太郎", img: "/img/momotaro.jpeg" }],
    3: [
      {
        title: "赤ずきん",
        img: "/img/littleRedRidingHood.jpg",
        link: "/read/reading",
      },
    ],
  };

  const handleLoginSuccess = (tabNumber: number) => {
    setIsUnlocked(true);
    setLockedTab(tabNumber);
    setIsModalLogin(false);
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
            <button
              className={styles.lockBtn}
              onClick={() => setIsModalLogin(true)}
            >
              {isUnlocked ? "ロック中" : "ロック解除中"}
            </button>
          </div>
          <Tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isUnlocked={isUnlocked}
            lockedTab={lockedTab}
          />
          <div className={styles.pictureBooksWrap}>
            <ul>
              {pictureBooks[activeTab]?.map((book, index) => (
                <li key={index}>
                  <p>{book.title}</p>
                  {book.link ? (
                    <Link href={book.link}>
                      <Image
                        src={book.img}
                        alt={`${book.title}の絵本`}
                        width={80}
                        height={80}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={book.img}
                      alt={`${book.title}の絵本`}
                      width={80}
                      height={80}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {isModalLogin && (
            <Login
              isUnlocked={isUnlocked} // 追加
              setIsModalLogin={setIsModalLogin}
              handleLoginSuccess={(tabNumber) => handleLoginSuccess(tabNumber)}
            />
          )}
        </div>
      ) : (
        // 画面縦向き
        <Portrait />
      )}
    </div>
  );
};

export default Read;
