// CheerTrainer.jsx  (hiển thị tất cả)
import TrainingLayout from "../../../components/layouts/TrainingLayout";
import TrainingProgramsPage from "./TrainingProgramsPage";
export default function CheerTrainer() {
  return (
    <TrainingLayout>
      <TrainingProgramsPage filterType="all" showCreate={false} />
    </TrainingLayout>
  );
}
