"use client";

import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Typography,
    Card,
} from "@mui/material";

const roles = ["Base", "Flyer", "Spotter", "Back"];
const skills = ["Releases","Twisting","Inversion","Flipping","Tumble","by Target Muscles","by Training Focus","Baskets","Dismounts","Jumps",];
export default function RoleSection() {
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleChange = (event) => {
        setSelectedRoles(event.target.value);
    };
    const handleSkillChange = (event) => {
        setSelectedSkills(event.target.value);
    };
    

    return (
        <Card sx={{ borderRadius: 2, boxShadow: 1, p: 2 }}>
            {/* --- What Role --- */}
            <Typography
                variant="subtitle1"
                sx={{ mb: 1, color: "#4a5566", fontWeight: 600, textAlign: "left" }}
            >
                What role?
            </Typography>

            <FormControl
                fullWidth
                sx={{
                    textAlign: "left",
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                            borderColor: "#e6e6e8",
                            borderWidth: 2,
                        },
                        "&:hover fieldset": {
                            borderColor: "grey.600",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#2e7d32",
                            borderWidth: 2,
                        },
                    },
                }}
            >
                <Select
                    multiple
                    displayEmpty
                    value={selectedRoles}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return (
                                <Typography sx={{ color: "#71717a", fontSize: "18px"}}>Select role</Typography>
                            );
                        }
                        return selected.join(", ");
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 5 + 8, // 48px là chiều cao 1 item, 5 items + khoảng padding
                                width: 250,
                            },
                        },
                      }}
                >
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            <Checkbox checked={selectedRoles.indexOf(role) > -1} />
                            <ListItemText primary={role} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* --- What Type of Skill --- */}
            <Typography
                variant="subtitle1"
                sx={{ mb: 1, color: "#4a5566", fontWeight: 600, textAlign: "left" }}
            >
                What type of skill are you working on?
            </Typography>
            <FormControl fullWidth
                sx={{
                    textAlign: "left",
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                            borderColor: "#e6e6e8",
                            borderWidth: 2,
                        },
                        "&:hover fieldset": {
                            borderColor: "grey.600",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#2e7d32",
                            borderWidth: 2,
                        },
                    },
                }}
            >
                <Select
                    multiple
                    value={selectedSkills}
                    onChange={handleSkillChange}
                    input={<OutlinedInput />}
                    displayEmpty
                    renderValue={(selected) =>
                        selected.length === 0 ? (
                            <Typography sx={{ color: "#71717a", fontSize: "18px" }}>Select skill</Typography>
                        ) : (
                            selected.join(", ")
                        )
                    }
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 5 + 8, // 48px là chiều cao 1 item, 5 items + khoảng padding
                                width: 250,
                            },
                        },
                      }}
                >
                    {skills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                            <Checkbox checked={selectedSkills.indexOf(skill) > -1} />
                            <ListItemText primary={skill} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Card>
    );
}
