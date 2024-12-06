// /app/data/questions.js
export const questions = [
  {
    id: 1,
    question: "Q1.絵本のタイプを選んでください",
    options: [
      { label: "シンプルな物語", value: "type_story" },
      { label: "間違い探し", value: "type_puzzle" },
      { label: "布の絵本", value: "type_cloth" },
      { label: "仕掛け絵本", value: "type_trick" },
      { label: "形が特殊な絵本", value: "type_shape" },
      { label: "迷路", value: "type_maze" },
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
];
