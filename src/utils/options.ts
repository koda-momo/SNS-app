// 店舗のジャンルの選択肢
export const genreOptions = [
  { id: "G001", name: "居酒屋" },
  { id: "G003", name: "創作料理" },
  { id: "G004", name: "和食" },
  { id: "G005", name: "洋食" },
  { id: "G006", name: "イタリアン・フレンチ" },
  { id: "G007", name: "中華" },
  { id: "G008", name: "焼肉・ホルモン" },
  { id: "G009", name: "アジア・エスニック料理" },
  { id: "G010", name: "各国料理" },
  { id: "G013", name: "ラーメン" },
  { id: "G014", name: "カフェ・スイーツ" },
  { id: "G015", name: "その他グルメ" },
  { id: "G016", name: "お好み焼き・もんじゃ" },
  { id: "G017", name: "韓国料理" },
];

// 店舗のタイプの選択肢
export const typeOptions = [
  { id: "1", name: "店内" },
  { id: "2", name: "お弁当" },
  { id: "3", name: "両方" },
];

// 星の数の選択オプション
export const starOptions = [
  { id: "5", name: "5" },
  { id: "4", name: "4" },
  { id: "3", name: "3" },
  { id: "2", name: "2" },
  { id: "1", name: "1" },
];

// 店舗の並び替えのオプション
export const orderOptions = [
  {
    id: "1",
    name: "最新順",
  },
  {
    id: "2",
    name: "評価順",
  },
];
// 店舗のジャンルの選択肢(検索用)
export const searchGenreOptions = [
  {
    id: "G000",
    name: "すべて",
  },
  ...genreOptions,
  { id: "G002", name: "ダイニングバー・バル" },
];
// 店舗のタイプの選択肢(検索用)
export const searchTypeOptions = [
  {
    id: "0",
    name: "すべて",
  },
  ...typeOptions,
];

// 店の並び替え&絞り込みの初期値
export const defaultSearchParams = {
  orderParam: orderOptions[0].name,
  genreParam: searchGenreOptions[0].id,
  typeParam: Number(searchTypeOptions[0].id),
};