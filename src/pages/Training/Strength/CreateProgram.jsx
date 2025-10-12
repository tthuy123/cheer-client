import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import ProgramType from "../../../components/CreateProgram/ProgramType";
// import RoleSection from "../../../components/CreateProgram/RoleSection";
import ExercisePicker from "../../../components/Training/CreateProgram/ExercisePicker";

const CreateProgram = () => {
    return (
        <div>
        <Typography
        variant="h5"
        sx={{ color: "#226F4A", fontWeight: 600, mb: 2 }}
        >
        Create Program
        </Typography>
            <ProgramType />
            <ExercisePicker />

            <Button variant="contained" color="success" sx={{ mt: 5, width: "100%", textTransform: 'none', fontWeight: 600 }}>
                Go to Program Editor
            </Button>
            
        </div>
    );
};

export default CreateProgram;