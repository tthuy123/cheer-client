import * as React from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

import TrainingLayout from '../../components/layouts/TrainingLayout';

const sampleRows = [
  { athlete: "Nhung Hong", strengthDays: 10, teamAvgDays: 12, cardioMin: 180, teamAvgMin: 164 },
  { athlete: "Quan Nguyen", strengthDays: 11, teamAvgDays: 12, cardioMin: 150, teamAvgMin: 164 },
  { athlete: "Taylor nguyen", strengthDays: 15, teamAvgDays: 12, cardioMin: 165, teamAvgMin: 164 },
];

// Reusable table component
export function LogTable({ rows }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderColor: "divider" }}>
      <Table aria-label="team training log">
        {/* Grouped header row */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 600, fontSize: 18, borderBottom: 1, borderColor: "divider" }}
            >
              Athlete
            </TableCell>
            <TableCell
              align="center"
              colSpan={4}
              sx={{ fontWeight: 600, fontSize: 18, borderBottom: 1, borderColor: "divider" }}
            >
              Strength Training
            </TableCell>
            {/*<TableCell
              align="center"
              colSpan={2}
              sx={{ fontWeight: 600, fontSize: 18, borderBottom: 1, borderColor: "divider" }}
            >
              Weekly Cardio
            </TableCell>*/}
          </TableRow>

          {/* Sub-header row */}
          <TableRow>
            <TableCell sx={{ borderBottom: 1, borderColor: "divider" }} />
            <TableCell
              align="center"
              sx={{ color: "text.secondary", borderBottom: 1, borderColor: "divider" }}
            >
              Days
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "text.secondary", borderBottom: 1, borderColor: "divider" }}
            >
              Team Avg
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "text.secondary", borderBottom: 1, borderColor: "divider" }}
            >
              Minutes
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "text.secondary", borderBottom: 1, borderColor: "divider" }}
            >
              Team Avg
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {rows.map((r, idx) => (
            <TableRow
              key={r.athlete}
              sx={{
                "&:nth-of-type(even)": { backgroundColor: "action.hover" }, // zebra rows
              }}
            >
              <TableCell sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Typography color="text.primary">{r.athlete}</Typography>
              </TableCell>

              <TableCell align="center" sx={{ borderBottom: 1, borderColor: "divider" }}>
                {r.strengthDays} d
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Box component="span" sx={{ color: "success.main" }}>
                  {r.teamAvgDays} d
                </Box>
              </TableCell>

              <TableCell align="center" sx={{ borderBottom: 1, borderColor: "divider" }}>
                {r.cardioMin} min
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Box component="span" sx={{ color: "success.main" }}>
                  {r.teamAvgMin} min
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default function TeamTrainingLog() {
  return (
    <TrainingLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LogTable rows={sampleRows} />
      </Container>
    </TrainingLayout>
  );
}