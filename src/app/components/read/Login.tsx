import { useState } from "react";
import Image from "next/image";
import close from "../../../../public/img/close.svg";
import styles from "./Login.module.scss";

interface LoginProps {
  isUnlocked: boolean; // 追加
  setIsModalLogin: (value: boolean) => void;
  handleLoginSuccess: (tabNumber: number) => void;
}

export default function Login({
  isUnlocked,
  setIsModalLogin,
  handleLoginSuccess,
}: LoginProps) {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateLogin = () => {
    if (password === "144144" && selectedTab !== null) {
      handleLoginSuccess(selectedTab);
    } else {
      setError("パスワードが正しくありません");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalLogin}>
        <div className={styles.modalHeader}>
          <button
            className={styles.modalCloseBtn}
            onClick={() => setIsModalLogin(false)}
          >
            <Image src={close} alt="閉じる" />
          </button>
          <h2>ロックを管理</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateLogin();
          }}
          className={styles.modalForm}
        >
          <div className={styles.formGroup}>
            <input
              type="password"
              className={styles.password}
              required
              placeholder="6桁の認証番号を入力してください"
              maxLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="\d{6}"
              title="6桁の数字を入力してください"
            />
            <select
              name="children"
              id="children"
              className={styles.children}
              onChange={(e) => setSelectedTab(Number(e.target.value))}
              required
            >
              <option value="">--お子様を選択してください--</option>
              <option value="1">ももこ</option>
              <option value="2">ひかる</option>
              <option value="3">れいか</option>
            </select>
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <button type="submit" disabled={selectedTab === null}>
            {isUnlocked ? "ロック解除" : "ロック"}
          </button>
        </form>
      </div>
    </div>
  );
}
