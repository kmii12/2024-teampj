import { BtnStyle } from "./components/btnStyle";

export default function Home() {
  return (
    <>
      <h1>本を探す</h1>

      <div>
        <BtnStyle href="result/resultList" text="検索"></BtnStyle>
      </div>
    </>
  );
}
