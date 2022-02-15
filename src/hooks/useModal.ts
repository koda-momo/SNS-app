import { useCallback, useState } from "react";

/**
 * モーダルを開け閉めできるhook.
 * @returns 開閉状況／モーダルを開ける／モーダルを閉じる
 */
export const useModal = () => {
  // モーダルのオープン状態
  const [modalStatus, setModalStatus] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openModal = useCallback((e) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    setModalStatus(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeModal = useCallback(() => {
    setModalStatus(false);
  }, []);

  return { modalStatus, setModalStatus, openModal, closeModal };
};
