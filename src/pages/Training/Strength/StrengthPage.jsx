import React, { useState, useEffect } from "react";
import StrengthBar from "../../../components/Training/StrengthBar";

// Import 3 trang con
import CheerTrainer from "./CheerTrainer";
import TeamPrograms from "./TeamPrograms";
import MyPrograms from "./MyPrograms";

// Đặt một 'key' (khóa) để lưu vào bộ nhớ
const LAST_TAB_KEY = "strengthPageLastTab";

export default function StrengthPage() {
  // 1. Đọc tab từ bộ nhớ. Nếu không có, dùng "Cheer Trainer"
  const [activeSubTab, setActiveSubTab] = useState(
    () => sessionStorage.getItem(LAST_TAB_KEY) || "Cheer Trainer"
  );

  // 2. Mỗi khi 'activeSubTab' thay đổi (do user click),
  // tự động lưu nó vào bộ nhớ.
  useEffect(() => {
    sessionStorage.setItem(LAST_TAB_KEY, activeSubTab);
  }, [activeSubTab]);

  // Hàm để đổi tab (truyền cho StrengthBar)
  const handleChangeTab = (tabName) => {
    setActiveSubTab(tabName);
  };

  // Gán component tương ứng
  let content;
  switch (activeSubTab) {
    case "Team Programs":
      content = <TeamPrograms />;
      break;
    case "My Programs":
      content = <MyPrograms />;
      break;
    default:
      content = <CheerTrainer />;
      break;
  }

  return (
    <>
      <StrengthBar
        activeSubTab={activeSubTab}
        onChangeSubTab={handleChangeTab} // Sử dụng hàm mới
      />
      <main>
        {content}
      </main>
    </>
  );
}