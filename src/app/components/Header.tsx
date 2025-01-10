import { color } from "../styles/color";
import Image from "next/image";
import logo from "../../../public/img/logo.svg";

export default function Header() {
  return (
    <header style={header}>
      <h1 style={title}>
        <Image src={logo} alt="えほんポケットのロゴ" />
      </h1>
      <p style={text}>
        わからない場合は右のやじるしボタンで次の質問に進んでください
        <br />
        また、左のやじるしボタンで前の質問に戻ることができます
      </p>
    </header>
  );
}

const header = {
  paddingTop: "4dvh",
  paddingBottom: "4dvh",
  textAlign: "center" as const,
};

const title = {
  fontSize: "1.6rem",
};

const text = {
  fontSize: "1rem",
  color: color.main,
  fontWeight: "bold" as const,
};
