import AlertsCard from "../components/HomePage/AlertsCard";
import TeamCheckOffCard from "../components/HomePage/TeamCheckOffCard";
import TeamTrainingCard from "../components/HomePage/TeamTrainingCard";

import MainLayout from "../components/layouts/MainLayout";

export default function HomePage() {
    return (
        <MainLayout>
            <div>
                <AlertsCard />
                <TeamCheckOffCard />
                <TeamTrainingCard />
            </div>
        </MainLayout>
    );
}
