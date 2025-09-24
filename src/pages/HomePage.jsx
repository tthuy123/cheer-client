import AlertsCard from "../components/HomePage/AlertsCard";
import TeamCheckOffCard from "../components/HomePage/TeamCheckOffCard";
import TeamTrainingCard from "../components/HomePage/TeamTrainingCard";
import MenuBar from "../components/common/MenuBar";

export default function HomePage() {
    return (
        <div>
            <AlertsCard />
            <TeamCheckOffCard />
            <TeamTrainingCard />
            <MenuBar/>
        </div>
    );
}
