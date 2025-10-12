import React, { useState } from "react";
import StrengthBar from "../../../components/Training/StrengthBar";

// Import 3 trang con
import CheerTrainer from "./CheerTrainer";
import TeamPrograms from "./TeamPrograms";
import MyPrograms from "./MyPrograms";

export default function StrengthPage() {
  const [activeSubTab, setActiveSubTab] = useState("Cheer Trainer");

  // Gán component tương ứng (chú ý: KHÔNG return component function mà return JSX)
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
        onChangeSubTab={setActiveSubTab}
      />
      <main>
        {content}
      </main>
    </>
  );
}
