import React, { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Nested from "./Nested";

function App() {
  const [val, setVal] = useState(false);
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
    nested: "",
  };
  const formSchema = yup.object({
    def: yup.object({
      name: val
        ? yup.string().trim()
        : yup.string().required().trim().max(9).min(9),
      password: yup.string().required().min(8).trim(),
      confirmPass: yup
        .string()
        .required()
        .trim()
        .oneOf([yup.ref("password")], "Passwords must match"),
      email: yup.string().email().required().trim(),
      age: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError("Please enter a number"),
      tanc: yup.boolean().oneOf([true], "Please accept the terms"),
      color: yup.string().required(),
      want: yup.array().min(2, "min 2"),
    }),
    nested: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    setValue("def.tanc", true, { shouldValidate: true });
  }, []);

  useEffect(() => {
    const watchName = watch((value) => {
      if (value.def.name.length === 9) console.log("lessgo");
    });
    return () => watchName.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider register={register} errors={errors}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          name="name"
          {...register("def.name")}
          maxLength={9}
        />
        {errors?.def?.name?.message ? (
          <p>{errors?.def?.name?.message}</p>
        ) : null}
        <input type="email" name="email" {...register("def.email")} />
        {errors?.def?.email?.message ? (
          <p>{errors?.def?.email?.message}</p>
        ) : null}
        <input type="password" name="password" {...register("def.password")} />
        {errors?.def?.password?.message ? (
          <p>{errors?.def?.password?.message}</p>
        ) : null}
        <input
          type="password"
          name="confirmPass"
          {...register("def.confirmPass")}
        />
        {errors?.def?.confirmPass?.message ? (
          <p>{errors?.def?.confirmPass?.message}</p>
        ) : null}
        <input type="text" name="age" {...register("def.age")} />
        {errors?.def?.age?.message ? <p>{errors?.def?.age?.message}</p> : null}
        <input type="checkbox" name="tanc" {...register("def.tanc")} />
        {errors?.def?.tanc?.message ? (
          <p>{errors?.def?.tanc?.message}</p>
        ) : null}
        <select name="color" {...register("def.color")}>
          <option value="">Select a Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        {errors?.def?.color?.message ? (
          <p>{errors?.def?.color?.message}</p>
        ) : null}
        <label htmlFor="want">1</label>
        <input {...register("def.want")} type="checkbox" value={1} />
        <label htmlFor="want">2</label>
        <input {...register("def.want")} type="checkbox" value={2} />
        {errors?.def?.want?.message ? (
          <p>{errors?.def?.want?.message}</p>
        ) : null}
        <input
          type="checkbox"
          value={val}
          onChange={(e) => setVal(e.target.checked)}
        />
        <Nested />
        <input type="submit" value="Submit" />
      </form>
    </FormProvider>
  );
}

export default App;
