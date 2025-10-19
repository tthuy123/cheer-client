// MyPrograms.jsx  (type = My)
import TrainingLayout from "../../../components/layouts/TrainingLayout";
import TrainingProgramsPage from "./TrainingProgramsPage";
export default function MyPrograms() {
  return (
    <TrainingLayout>
      <TrainingProgramsPage filterType="my" showCreate />
    </TrainingLayout>
  );
}
