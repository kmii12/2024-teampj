"use client";
import { useEffect, useState } from "react";
import Portrait from "../components/Portrait";
import styles from "./Read.module.scss";
import Image from "next/image";
import close from "../../../public/img/close.svg";
import ReadLogin from "../components/ReadLogin";
import Link from "next/link";

const Read: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const openReadLogin = () => setIsModalOpen(true);
  const closeReadLogin = () => setIsModalOpen(false);

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
              {["ももこ", "ひかる", "れいか"].map((tab, index) => (
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
                      src="/img/aladdin.jpg"
                      alt="アラジンの絵本の写真"
                      width={80}
                      height={80}
                    />
                  </li>
                  <li>
                    <p>かぐや姫</p>
                    <Image
                      src="/img/kaguyahime.jpg"
                      alt="かぐや姫の絵本の写真"
                      width={80}
                      height={80}
                    />
                  </li>
                </>
              )}
              {activeTab === 2 && (
                <>
                  <li>
                    <p>桃太郎</p>
                    <Image
                      src="/img/momotaro.jpeg"
                      alt="桃太郎の絵本の写真"
                      width={80}
                      height={80}
                    />
                  </li>
                </>
              )}
              {activeTab === 3 && (
                <>
                  <li>
                    <Link href="/read/reading">
                      <p>赤ずきん</p>
                      <Image
                        src="/img/littleRedRidingHood.jpg"
                        alt="赤ずきんの絵本の写真"
                        width={80}
                        height={80}
                      />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <ReadLogin isOpen={isModalOpen} onClose={closeReadLogin}>
            <h2>ログイン</h2>
            <form>
              <label>
                ユーザー名:
                <input type="text" />
              </label>
              <label>
                パスワード:
                <input type="password" />
              </label>
              <button type="submit">ログイン</button>
            </form>
          </ReadLogin>
        </div>
      ) : (
        // 画面縦向き
        <Portrait />
      )}
    </div>
  );
};

export default Read;
