import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "./components/TextBox";
import Select from "./components/Select";
import {
  Button,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import CheckBox from "./components/CheckBox";

function App() {
  const genders = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];

  const defaultValues = {
    def: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      age: "",
      tanc: false,
      gender: 0,
    },
  };

  const formSchema = yup.object({
    def: yup.object({
      name: yup.string().required("Name is Required.").trim(),
      password: yup
        .string()
        .required("Password is Required.")
        .min(8, "Password Should be of minimum 8 characters.")
        .trim(),
      confirmPass: yup
        .string()
        .required("Confirm Password is Required.")
        .trim()
        .oneOf([yup.ref("password")], "Passwords must match."),
      email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Email is Required.")
        .trim(),
      age: yup
        .string()
        .required("Age is Required.")
        .test(
          "min-age",
          "Age should be greater than 0.",
          (val) => parseInt(val) > 0
        ),
      tanc: yup
        .boolean()
        .oneOf([true], "Please accept the Terms and Conditions."),
      gender: yup.number().oneOf([1, 2], "Gender is Required."),
    }),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const handleNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onSubmit = (data) => console.log(data);

  return (
    <Paper sx={{ px: 4, py: 2 }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h4"
          textAlign="center"
          textTransform="uppercase"
          sx={{ mb: 1, letterSpacing: 2 }}
        >
          Register
        </Typography>
        <TextBox
          name="def.name"
          control={control}
          label="Name"
          type="text"
          error={errors?.def?.name?.message || null}
        />
        <TextBox
          name="def.email"
          control={control}
          label="Email"
          type="text"
          error={errors?.def?.email?.message || null}
        />
        <TextBox
          name="def.password"
          control={control}
          label="Password"
          type="password"
          error={errors?.def?.password?.message || null}
        />
        <TextBox
          name="def.confirmPass"
          control={control}
          label="Confirm Password"
          type="password"
          error={errors?.def?.confirmPass?.message || null}
        />
        <TextBox
          name="def.age"
          control={control}
          label="Age"
          type="text"
          error={errors?.def?.age?.message || null}
          onChange={handleNumber}
        />
        <Select
          name="def.gender"
          items={genders}
          error={errors?.def?.gender?.message || null}
          label="Gender"
          control={control}
          defText="Select a Gender"
        />
        <FormControl required error={Boolean(errors?.def?.tanc?.message)}>
          <FormControlLabel
            control={<CheckBox name="def.tanc" control={control} />}
            label="I accept the Terms and Conditions."
            labelPlacement="end"
          />
          <FormHelperText>
            {errors?.def?.tanc?.message ? errors?.def?.tanc?.message : " "}
          </FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ my: 2 }}>
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default App;
