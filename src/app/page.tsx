import Image from "next/image";
import logo from "../../public/img/logo_top.svg";
import Link from "next/link";
import Footer from "./components/Footer";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Image src={logo} alt="えほんポケットのロゴ" />
        <Link href={"/search"}>絵本を探す</Link>
      </main>
      <Footer />
    </>
  );
}
