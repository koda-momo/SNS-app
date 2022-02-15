// セレクトボックスのオプション
export type Option = {
  id: string;
  name: string;
};

// レビュー
export type LunchReview = {
  id: number;
  userId: number;
  accountName: string;
  userPhotoPath: string;
  restaurantId: number;
  restaurantName: string;
  restaurantPhotoPath: string;
  star: number;
  sentence: string;
  likeCount: number;
  commentCount: number;
  updatedTime?: Date | null;
  postedTime: Date;
  deleted?: boolean;
  myLike: boolean;
};

// レストラン情報
export type Restaurant = {
  id: number;
  name: string;
  address: string;
  genreFk: string;
  genreValue: string;
  star: number;
  type: 1 | 2 | 3;
  photoPath: string;
  hotpepperId: string;
  description: string;
  access: string;
  latitude: string;
  longitude: string;
  url: string;
  smoking: string;
  updatedTime: Date;
  postedTime: Date;
};

//コメントへのいいね
export type CommentHis = {
  id: number;
  userId: number;
  accountName: string;
  userPhotoPath: string;
  timelineId: number;
  reviewId: number;
  parentCommentId: number;
  comment: string;
  commentLikeCount: number;
  actionedTime: Date;
  hasNoticed: boolean;
  commentDeleted: boolean;
  like: boolean;
  myLike: boolean;
  read: boolean;
};

//ユーザ情報画面
export type UserInfo = {
  name: string;
  hireDate: string;
  serviceFk: string;
  serviceName: string;
  accountName: string;
  birthDay: string;
  introduction: string;
  userPhotoPath: string;
};

//ユーザ本登録時のユーザー情報
export type UserSignupInfo = {
  name: string;
  hireDate: number;
  serviceFk: string;
  accountName: string;
  birthDay: number;
  password: string;
};

//ユーザ本登録画面
export type UserPreInfo = {
  name: string;
  email: string;
};

//ユーザー仮登録
export type UserTestInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

//ログインユーザー
export type LoginUser = {
  email: string;
  password: string;
};

//パスワード変更画面
export type UpdatePassInfo = {
  email: string;
};

//タイムライン
export type Timeline = {
  id: number;
  userId: number;
  accountName: string;
  userPhotoPath: string;
  sentence: string;
  likeCount: number;
  commentCount: number;
  updatedTime: string;
  postedTime: string;
  deleted: boolean;
  myLike: boolean;
};

export type Comment = {
  id: number;
  userId: number;
  accountName: string;
  userPhotoPath: string;
  timelineId: number;
  reviewId: number;
  parentCommentId: number;
  comment: string;
  commentLikeCount: number;
  actionedTime: string;
  hasNoticed: boolean;
  commentDeleted: boolean;
  read: boolean;
  like: boolean;
  myLike: boolean;
};

//タグのタイトル
export type Title = {
  id: number;
  title: string;
};

//通知
export type notion = {
  id: number; //通知ID
  userId: number; //反応してきたユーザID
  accountName: string; //反応してきたユーザの名前
  userPhotoPath: string; //反応してきたユーザの画像
  comment: string; //コメント
  like: boolean; //いいね
  timelineId: number; //タイムライン→元投稿ＩＤ
  timelineSentence: string; //タイムライン→元投稿内容
  reviewId: number; //レビュー→元投稿ID
  reviewSentence: string; //レビュー→元投稿内容
  parentCommentId: number; //親コメントID？
  parentCommentSentence: string; //親コメント内容？
  actionedTime: Date;
  hasNoticed: boolean; //
  read: boolean; //既読か否か
};
