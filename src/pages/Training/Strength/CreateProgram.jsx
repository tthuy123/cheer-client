import React from "react";
import ProgramType from "../../../components/CreateProgram/ProgramType";
// import RoleSection from "../../../components/CreateProgram/RoleSection";

const CreateProgram = () => {
    return (
        <div style={{ maxWidth: 1000, margin: "40px auto" }}>
            <h2>Create Program</h2>
            <ProgramType />
            
            {/* <RoleSection/> */}
        </div>
    );
};

export default CreateProgram;