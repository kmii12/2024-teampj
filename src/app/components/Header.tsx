// import { color } from "../styles/color";

import Image from "next/image";

export default function Header() {
  return (
    <header style={header}>
      <Image
        src="../img/logo.svg"
        alt="logo"
        width={200}
        height={60}
        style={{ objectFit: "contain" }}
      />
    </header>
  );
}

const header = {
  paddingTop: "5dvh",
  paddingBottom: "5dvh",
  textAlign: "center" as const,
};
