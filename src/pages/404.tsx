import { NextPage } from "next";

/**
 * 404ページ.
 * @returns 存在しないURL/削除済投稿が叩かれた際に開く
 */
const Error404Page: NextPage = () => {
  return (
    <div className="text-gray-600 mt-10 ml-12">
      <div className="text-3xl">404 This page could not be found.</div>

      <div>
        <i className="fas fa-exclamation-triangle"></i>ページが見つかりません
      </div>

      <div className="mt-10">下記の可能性があります</div>
      <ul className="ml-2 py-2">
        <li>・存在しないURL</li>
        <li>・情報が削除された</li>
        <li>・情報が存在しない</li>
      </ul>

      <div className="mt-10">
        解決策:メニューバーよりページに飛んでください。
      </div>
    </div>
  );
};

export default Error404Page;
