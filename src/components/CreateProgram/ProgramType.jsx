import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, Typography } from "@mui/material";
import SelectField from "./SelectField";

export default function ProgramType() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            programType: "my", // giá trị mặc định
        },
    });

    const options = [
        { value: "team", label: "Team Programs" },
        { value: "my", label: "My Programs" },
    ];

    const onSubmit = (data) => {
        console.log("Selected Program Type:", data.programType);
    };

    return (
        <>
            {/* Card chứa select box */}
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                <CardContent>
                    {/* Tiêu đề nằm ngoài card */}
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 1, color: "#4a5566", fontWeight: 600, textAlign: "left" }}
                    >
                        Program Type
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SelectField
                            name="programType"
                            control={control}
                            options={options}
                        />
                        
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
