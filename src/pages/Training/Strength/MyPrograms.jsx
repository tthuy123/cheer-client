import TrainingLayout from '../../../components/layouts/TrainingLayout';

import SearchBar from '../../../components/Training/SearchBar';
import ProgramCard from '../../../components/Training/ProgramCard';
import CreateCard from '../../../components/Training/CreateCard';

const MyPrograms = () => {
    return (
        <TrainingLayout>
            <CreateCard />
            <SearchBar />
            <ProgramCard />
        </TrainingLayout>
    );
};

export default MyPrograms;