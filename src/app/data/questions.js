// /app/data/questions.js
export const questions = [
  {
    id: 1,
    question: "Q1.絵本のタイプを選んでください",
    options: [
      { label: "シンプルな物語", value: "type_story" },
      { label: "形が特殊", value: "type_shape" },
      { label: "迷路", value: "type_maze" },
      { label: "間違い探し", value: "type_puzzle" },
      { label: "布", value: "type_cloth" },
      { label: "仕掛け", value: "type_trick" },
    ],
  },
  {
    id: 2,
    question: "Q2.絵本は日本作品?海外作品?",
    options: [
      { label: "日本", value: "location_japan" },
      { label: "海外", value: "location_abroad" },
    ],
  },
  {
    id: 3,
    question: "Q3.主人公の分類は?",
    options: [
      { label: "人間", value: "main_human" },
      { label: "陸の動物", value: "main_animal" },
      { label: "海の動物", value: "main_sea" },
      { label: "空の動物", value: "main_sky" },
      { label: "昆虫", value: "main_insect" },
      { label: "植物", value: "main_plant" },
      { label: "その他", value: "main_other" },
    ],
  },
];
