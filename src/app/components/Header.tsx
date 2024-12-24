// import { color } from "../styles/color";

import Image from "next/image";
import logo from "../../../public/img/logo.svg";

export default function Header() {
  return (
    <header style={header}>
      <h1 style={title}>
        <Image src={logo} alt="えほんポケットのロゴ" />
      </h1>
    </header>
  );
}

const header = {
  paddingTop: "4dvh",
  paddingBottom: "4dvh",
  textAlign: "center" as const,
  // border: "1px solid #ccc",
};

const title = {
  fontSize: "1.6rem",
};
