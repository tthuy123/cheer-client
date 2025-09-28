import React from 'react';
import TrainingBar from '../../../components/Training/TrainingBar';
import StrengthBar from '../../../components/Training/StrengthBar';
import SearchBar from '../../../components/Training/SearchBar';
import ProgramCard from '../../../components/Training/ProgramCard';

const CheerTrainer = () => {
    return (
        <div>
            <TrainingBar />
            <StrengthBar />
            <SearchBar />
            <ProgramCard />
        </div>
    );
};

export default CheerTrainer;