import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function TextBox({
  name,
  control,
  label,
  type,
  error,
  maxLength,
  onChange = undefined,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          onChange={
            onChange
              ? (e) => field.onChange(onChange(e.target.value))
              : field.onChange
          }
          label={label}
          type={type}
          error={Boolean(error)}
          helperText={error ?? " "}
          inputProps={{
            maxLength,
          }}
        />
      )}
    />
  );
}

export default TextBox;
