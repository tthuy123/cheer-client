// TeamPrograms.jsx (type = Team)
import TrainingLayout from "../../../components/layouts/TrainingLayout";
import TrainingProgramsPage from "./TrainingProgramsPage";
export default function TeamPrograms() {
  return (
    <TrainingLayout>
      <TrainingProgramsPage filterType="team" showCreate />
    </TrainingLayout>
  );
}
