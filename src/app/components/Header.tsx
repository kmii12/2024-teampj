import { color } from "../styles/color";

export default function Header() {
  return (
    <header style={header}>
      <div style={titleWrap}>
        <h1 style={title}>本を探す</h1>
      </div>
    </header>
  );
}

const header = {
  backgroundColor: color.base,
};

const titleWrap = {};

const title = {
  fontSize: "1.6rem",
  color: color.text,
};
