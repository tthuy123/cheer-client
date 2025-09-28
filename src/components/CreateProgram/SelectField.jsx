import React from "react";
import { Controller } from "react-hook-form";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

export default function SelectField({
    name,
    control,
    label,
    options,
    defaultValue = "",
    fullWidth = true,
}) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <FormControl
                    fullWidth={fullWidth}
                    error={!!error}
                    sx={{
                        textAlign: "left",
                        color: "text.secondary",
                        fontWeight: 500,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "& fieldset": {
                                borderColor: "#e6e6e8", // mặc định xám nhạt
                                borderWidth: 2,
                            },
                            "&:hover fieldset": {
                                borderColor: "grey.600", // hover xám đậm
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#2e7d32", // focus xanh
                                borderWidth: 2,
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "grey.700",
                            "&.Mui-focused": {
                                color: "#2e7d32", // label cũng xanh khi focus
                            },
                        },
                    }}
                >
                    <InputLabel>{label}</InputLabel>
                    <Select {...field} label={label}>
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}
