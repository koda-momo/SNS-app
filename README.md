This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 環境開発 終わったところ
- デフォルトのトップページを一旦空にしました。
- ESLintのインストール、設定
- Prettireの設定
- components, pages, stylesディレクトリをsrcディレクトリにまとめた
- Buttonコンポーネント(仮)の作成
- developブランチの作成
- TailwindCSSを使うためのインストールと設定を行なった

## ディレクトリ構成(暫定)
- src
  - components : コンポーネントを置く
  - pages : ページを置く
    - index.tsx
    - signup.tsx 新規登録
    - login.tsx ログイン
    - timelineフォルダ
      - index.tsx タイムライン一覧
      - [id].tsx
    - lunchフォルダ
      - reviewフォルダ
        - index.tsx
        - [id].tsx
        - post.tsx
      - restaurantフォルダ
        - index.tsx 
        - [id].tsx
        - add.tsx
    - learcenフォルダ
      - info.tsx ラーセン基本情報
    - userフォルダ
      - index.tsx 
      - edit.tsx
  - stories Storybook用のファイル
    
## コードの統一
- 基本
  - クォーテーションはダブル(Prettireで設定済)
  - タブの幅は半角2つ分(Prettireで設定済)
  - コードの後ろにはコンマつける(Prettireで設定済)
  - 関数はアロー関数で書く

- Reactの書き方
  - propsは外で分割代入
```
  export const Button: VFC<Props> = (props) => {
    const { label, onClick } = props;
```
- 
  - コンポーネントの型定義はFCで統一
    - childrenを渡したい時はpropsの型を別途定義
  - propsの型定義は、type aliasで行う
```
import { MouseEventHandler, FC } from 'react';

type Props = {
  label: string,
  onClick: MouseEventHandler<HTMLButtonElement>
}
  
export const Button: FC<Props> = (props) => {
```
- 
  - メモ化について
    - 子コンポーネントにpropsとして渡される関数はuseCallbackで囲む
    - コンポーネントはとりあえずmemoで囲む

## 使用技術
- CSS  ・・・ tailwindCSS
- 状態管理・・・Context (React hooks)
