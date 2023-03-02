import React from "react";
import { useFormContext } from "react-hook-form";

function Nested() {
  const { register, errors } = useFormContext();
  return (
    <>
      <input type="text" name="nested" {...register("nested")} />
      {errors?.nested?.message ? <p>{errors?.nested?.message}</p> : null}
    </>
  );
}

export default Nested;
