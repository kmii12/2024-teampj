import { btnStyle } from "./components/btnStyle";

export default function Home() {
  return (
    <>
      <h1>本を探す</h1>

      <div>
        <btnStyle href="result/resultList" text="検索"></btnStyle>
      </div>
    </>
  );
}
