import React from "react";
import { Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

function CheckBox({ name, control, disabled = false }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Checkbox {...field} disabled={disabled} />}
    />
  );
}

export default CheckBox;
