// import { color } from "../styles/color";

export default function Header() {
  return (
    <header style={header}>
      <h1 style={title}>ロゴ</h1>
    </header>
  );
}

const header = {
  paddingTop: "5dvh",
  paddingBottom: "6dvh",
  textAlign: "center" as const,
};

const title = {
  fontSize: "1.6rem",
  // display: "inline-block",
  // backgroundColor: color.white,
  // border: `4px solid ${color.main}`,
  // borderRadius: "10px",
  // color: color.text,
};
