import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "./components/TextBox";

function App() {
  const defaultValues = {
    def: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      age: "",
      tanc: false,
      color: "",
      want: [],
    },
  };
  const formSchema = yup.object({
    def: yup.object({
      name: yup.string().required("Name is Required.").trim().max(9).min(9),
      password: yup.string().required("Password is Required.").min(8).trim(),
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
      age: yup.string().required("Age is Required."),
      tanc: yup
        .boolean()
        .oneOf([true], "Please accept the Terms and Conditions."),
      gender: yup.string().required("Gender is Required."),
      want: yup.array().min(2, "min 2"),
    }),
    nested: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);

  const handleNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextBox
        name="def.name"
        control={control}
        label="Name"
        type="text"
        error={errors?.def?.name?.message || null}
        maxLength={9}
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
        label="ConfirmPass"
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
      <input type="checkbox" name="tanc" {...register("def.tanc")} />
      {errors?.def?.tanc?.message ? <p>{errors?.def?.tanc?.message}</p> : null}
      <select name="gender" {...register("def.gender")}>
        <option value="">Select your Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors?.def?.gender?.message ? (
        <p>{errors?.def?.gender?.message}</p>
      ) : null}
      <label htmlFor="want">1</label>
      <input {...register("def.want")} type="checkbox" value={1} />
      <label htmlFor="want">2</label>
      <input {...register("def.want")} type="checkbox" value={2} />
      {errors?.def?.want?.message ? <p>{errors?.def?.want?.message}</p> : null}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
