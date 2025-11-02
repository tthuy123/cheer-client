import { Container, Box, Button, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import ProgramType from "../../../components/CreateProgram/ProgramType";
import ExercisePicker from "../../../components/Training/CreateProgram/ExercisePicker";

const CreateProgram = () => {
  const navigate = useNavigate();
  const [programType, setProgramType] = useState("team");
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleBack = () => {
    if (window.history.length <= 1) navigate("/");
    else navigate(-1);
  };

  const handleGoToEditor = () => {
    navigate("/training/strength/program", {
      state: { programType, selectedExercises },
    });
  };

  const canProceed = useMemo(
    () => !!programType && selectedExercises.length > 0,
    [programType, selectedExercises]
  );

  return (
    <Container sx={{ mt: 2, mb: 6 }}>
      {/* Header */}
      <Box sx={{ position: "relative", mb: 2, height: 40, display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleBack} size="small" aria-label="Back" sx={{ position: "absolute", left: 0 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" sx={{ color: "#226F4A", fontWeight: 600, width: "100%", textAlign: "center" }}>
          Create Program
        </Typography>
      </Box>

      {/* Nội dung */}
      {/* Yêu cầu ProgramType gọi onChange(typeValue) */}
      <ProgramType onChange={setProgramType} />

      {/* Yêu cầu ExercisePicker gọi onChangeSelected(list) */}
      <ExercisePicker onChangeSelected={setSelectedExercises} />

      <Button
        variant="contained"
        color="success"
        onClick={handleGoToEditor}
        disabled={!canProceed}
        sx={{ mt: 5, width: "100%", textTransform: "none", fontWeight: 600 }}
      >
        Go to Program Editor
      </Button>
    </Container>
  );
};

export default CreateProgram;
