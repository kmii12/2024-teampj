import styles from "./Reading.module.scss";
import Image from "next/image";
import closeBtn from "../../../../public/img/close.svg";
import Link from "next/link";

export default function Reading() {
  return (
    <>
      <div className={styles.readingWrap}>
        <div className={styles.pictureBookWrap}>
          <Link href="/read">
            <Image src={closeBtn} alt="閉じる" />
          </Link>
          <div className={styles.pictureBook}></div>
        </div>
        <figure className={styles.figure}>
          <audio controls src="/media/cc0-audio/t-rex-roar.mp3"></audio>
        </figure>
      </div>
    </>
  );
}
