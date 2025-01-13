// types/pictureBook.ts
export interface PictureBook {
  id: number; // ID
  title: string; // タイトル
  writer: string; // 作者
  illustrator: string; // イラストレーター
  livingThing: string[]; // 生き物
  mainCharacter: string; // 主人公
  character: string[]; // キャラクター
  genre: string; // ジャンル
  location: string; // 場所
  hue: string; // 色調
  atmosphere: string[]; // 雰囲気
  season: string; // 季節
  image: string; // 画像URL
  feature: string; // 特徴
}
