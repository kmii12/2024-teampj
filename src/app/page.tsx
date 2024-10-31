// "use client";
// import { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import Header from "./components/Header";
// import styles from "./page.module.scss";
// import data from "./data/keywords.json";
// import { Keywords } from "./types/keywords";
// import Link from "next/link";

// export default function Home() {
//   const keywords: Keywords = data;
//   const [selectedKeywords, setSelectedKeywords] = useState<{
//     seasons: Set<number>;
//     livingThings: Set<number>;
//     hue: Set<number>;
//     atmosphere: Set<number>;
//     locations: Set<number>;
//     features: Set<number>;
//   }>({
//     seasons: new Set(),
//     livingThings: new Set(),
//     hue: new Set(),
//     atmosphere: new Set(),
//     locations: new Set(),
//     features: new Set(),
//   });
//   const toggleSelect = (
//     category: keyof typeof selectedKeywords,
//     index: number
//   ) => {
//     setSelectedKeywords((prevState) => {
//       const newSet = new Set(prevState[category]);
//       if (newSet.has(index)) {
//         newSet.delete(index);
//       } else {
//         newSet.add(index);
//       }
//       return { ...prevState, [category]: newSet };
//     });
//   };

//   return (
//     <>
//       <Header />
//       <input type="search" id="bookSearch" name="search" />
//       <main className={styles.main}>
//         <SearchBar />
//         <div className={styles.selectList}>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>季節</h2>
//               <ul>
//                 {keywords.seasons.map((season, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.seasons.has(index) ? styles.selected : ""
//                     }
//                     onClick={() => toggleSelect("seasons", index)}
//                   >
//                     {season}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>生き物</h2>
//               <ul>
//                 {keywords.livingThings.map((thing, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.livingThings.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("livingThings", index)}
//                   >
//                     {thing}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>色合い</h2>
//               <ul>
//                 {keywords.hue.map((color, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.hue.has(index) ? styles.selected : ""
//                     }
//                     onClick={() => toggleSelect("hue", index)}
//                   >
//                     {color}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>雰囲気</h2>
//               <ul>
//                 {keywords.atmosphere.map((atmos, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.atmosphere.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("atmosphere", index)}
//                   >
//                     {atmos}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>国</h2>
//               <ul>
//                 {keywords.locations.map((location, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.locations.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("locations", index)}
//                   >
//                     {location}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//           <section className={styles.keywordWrap}>
//             <div>
//               <h2>特徴</h2>
//               <ul>
//                 {keywords.features.map((feature, index) => (
//                   <li
//                     key={index}
//                     className={
//                       selectedKeywords.features.has(index)
//                         ? styles.selected
//                         : ""
//                     }
//                     onClick={() => toggleSelect("features", index)}
//                   >
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//         </div>
//         <div className={styles.btnWrap}>
//           <button
//             className={styles.resetBtn}
//             onClick={() => {
//               setSelectedKeywords({
//                 seasons: new Set(),
//                 livingThings: new Set(),
//                 hue: new Set(),
//                 atmosphere: new Set(),
//                 locations: new Set(),
//                 features: new Set(),
//               });
//             }}
//           >
//             <p>リセット</p>
//           </button>
//           <Link className={styles.searchBtn} href="/result" passHref>
//             <p>検索</p>
//           </Link>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import styles from "./page.module.scss";
import data from "./data/keywords.json";
import { Keywords } from "./types/keywords";

export default function Home() {
  const keywords: Keywords = data;
  const [selectedKeywords, setSelectedKeywords] = useState<{
    seasons: Set<number>;
    livingThings: Set<number>;
    hue: Set<number>;
    atmosphere: Set<number>;
    locations: Set<number>;
    features: Set<number>;
  }>({
    seasons: new Set(),
    livingThings: new Set(),
    hue: new Set(),
    atmosphere: new Set(),
    locations: new Set(),
    features: new Set(),
  });

  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

  const toggleSelect = (
    category: keyof typeof selectedKeywords,
    index: number
  ) => {
    setSelectedKeywords((prevState) => {
      const newSet = new Set(prevState[category]);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return { ...prevState, [category]: newSet };
    });
  };

  const handleSearch = () => {
    // 絞り込みのためのフィルタリング関数
    const results = data.filter((book) => {
      // キーワードごとに選択した条件と一致するか確認
      const matchesSeason =
        !selectedKeywords.seasons.size ||
        selectedKeywords.seasons.has(book.season);
      const matchesLivingThings =
        !selectedKeywords.livingThings.size ||
        selectedKeywords.livingThings.has(book.livingThing);
      const matchesHue =
        !selectedKeywords.hue.size || selectedKeywords.hue.has(book.hue);
      const matchesAtmosphere =
        !selectedKeywords.atmosphere.size ||
        selectedKeywords.atmosphere.has(book.atmosphere);
      const matchesLocation =
        !selectedKeywords.locations.size ||
        selectedKeywords.locations.has(book.location);
      const matchesFeatures =
        !selectedKeywords.features.size ||
        selectedKeywords.features.has(book.features);

      return (
        matchesSeason &&
        matchesLivingThings &&
        matchesHue &&
        matchesAtmosphere &&
        matchesLocation &&
        matchesFeatures
      );
    });

    setFilteredBooks(results); // 絞り込まれた結果を状態として保持
  };

  return (
    <>
      <Header />
      <input type="search" id="bookSearch" name="search" />
      <main className={styles.main}>
        <SearchBar />
        <div className={styles.selectList}>
          <section className={styles.keywordWrap}>
            <div>
              <h2>季節</h2>
              <ul>
                {keywords.seasons.map((season, index) => (
                  <li
                    key={index}
                    className={
                      selectedKeywords.seasons.has(index) ? styles.selected : ""
                    }
                    onClick={() => toggleSelect("seasons", index)}
                  >
                    {season}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.keywordWrap}>
            <div>
              <h2>生き物</h2>
              <ul>
                {keywords.livingThings.map((thing, index) => (
                  <li
                    key={index}
                    className={
                      selectedKeywords.livingThings.has(index)
                        ? styles.selected
                        : ""
                    }
                    onClick={() => toggleSelect("livingThings", index)}
                  >
                    {thing}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.keywordWrap}>
            <div>
              <h2>色合い</h2>
              <ul>
                {keywords.hue.map((color, index) => (
                  <li
                    key={index}
                    className={
                      selectedKeywords.hue.has(index) ? styles.selected : ""
                    }
                    onClick={() => toggleSelect("hue", index)}
                  >
                    {color}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.keywordWrap}>
            <div>
              <h2>雰囲気</h2>
              <ul>
                {keywords.atmosphere.map((atmos, index) => (
                  <li
                    key={index}
                    className={
                      selectedKeywords.atmosphere.has(index)
                        ? styles.selected
                        : ""
                    }
                    onClick={() => toggleSelect("atmosphere", index)}
                  >
                    {atmos}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.keywordWrap}>
            <div>
              <h2>国</h2>
              <ul>
                {keywords.locations.map((location, index) => (
                  <li
                    key={index}
                    className={
                      selectedKeywords.locations.has(index)
                        ? styles.selected
                        : ""
                    }
                    onClick={() => toggleSelect("locations", index)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={styles.keywordWrap}>
            <div>
              <h2>特徴</h2>
              <ul>
                {keywords.features.map((feature, index) => (
                  <li
                    key={index}
                    className={
                      selectedKeywords.features.has(index)
                        ? styles.selected
                        : ""
                    }
                    onClick={() => toggleSelect("features", index)}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
        <div className={styles.btnWrap}>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setSelectedKeywords({
                seasons: new Set(),
                livingThings: new Set(),
                hue: new Set(),
                atmosphere: new Set(),
                locations: new Set(),
                features: new Set(),
              });
              setFilteredBooks([]); // リセット時に検索結果をクリア
            }}
          >
            <p>リセット</p>
          </button>
          <button className={styles.searchBtn} onClick={handleSearch}>
            <p>検索</p>
          </button>
        </div>
        {/* 絞り込み結果の表示部分 */}
        <div className={styles.results}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className={styles.bookItem}>
                <h3>{book.title}</h3>
                <p>作家: {book.writer}</p>
                <p>場所: {book.location}</p>
                <p>雰囲気: {book.atmosphere}</p>
              </div>
            ))
          ) : (
            <p>条件に一致する絵本が見つかりませんでした。</p>
          )}
        </div>
      </main>
    </>
  );
}
