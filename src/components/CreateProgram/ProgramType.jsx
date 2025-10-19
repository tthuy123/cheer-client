import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Card, CardContent, Typography } from "@mui/material";
import SelectField from "./SelectField";

export default function ProgramType({ onChange, defaultValue = "my" }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      programType: defaultValue, // giá trị mặc định
    },
  });

  const options = [
    { value: "team", label: "Team Programs" },
    { value: "my", label: "My Programs" },
  ];

  // Theo dõi giá trị hiện tại của select
  const programType = useWatch({
    control,
    name: "programType",
  });

  // Mỗi khi đổi lựa chọn => bắn ra ngoài
  useEffect(() => {
    if (onChange) onChange(programType);
  }, [programType, onChange]);

  const onSubmit = (data) => {
    // Không bắt buộc submit form, vì đã bắn onChange theo thời gian thực.
    // Giữ lại để dev tools/console cần debug:
    console.log("Selected Program Type:", data.programType);
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardContent>
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
