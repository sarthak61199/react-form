import React from "react";
import { TextField, MenuItem, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

function Select({ name, items, error, label, control, defText }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          select
          label={label}
          error={Boolean(error)}
          helperText={error ?? " "}
          margin="normal"
        >
          <MenuItem value={0}>
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: Boolean(error) ? "#d32f2f" : "inherit",
              }}
            >
              {defText}
            </Typography>
          </MenuItem>
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

export default Select;
