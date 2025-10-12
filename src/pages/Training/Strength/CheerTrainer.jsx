import TrainingLayout from '../../../components/layouts/TrainingLayout';

import SearchBar from '../../../components/Training/SearchBar';
import ProgramCard from '../../../components/Training/ProgramCard';

const CheerTrainer = () => {
    return (
        <TrainingLayout>
            <SearchBar />
            <ProgramCard />
        </TrainingLayout>
    );
};

export default CheerTrainer;