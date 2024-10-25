"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import firebase from "../../firebase/firebaseConfig"; // Firebaseの設定をインポート
import styles from "./BookDetail.module.scss";

const resultDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URLから動的なIDを取得
  const [resultDetail, setResultDetail] = useState(null); //本のデータを保存するstate
};
