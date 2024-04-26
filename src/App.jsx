import { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Z from "zod";

function App() {
  const signupSchema = Z.object({
    name: Z.string().min(1).max(50),
    email: Z.string().min(1).max(50).email(),
    password: Z.string().min(8, { message: "Password is too short" }),
    passwordb: Z.string(),
  }).refine((data) => data.password === data.passwordb, {
    message: "Passwords do not match",
    path: ["passwordb"], // path of error
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit"
  });
  const onSubmit = (data) => console.log(data);
  errors && console.log(errors);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          gap: "10px",
        }}
      >
        <Controller
          name="name"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <TextField
              label="Name"
              variant="outlined"
              {...field}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <TextField
              label="Email"
              variant="outlined"
              {...field}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              variant="outlined"
              {...field}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          )}
        />
        <Controller
          name="passwordb"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <TextField
              label="Password Again"
              variant="outlined"
              {...field}
              error={!!errors.passwordb}
              helperText={errors?.passwordb?.message}
            />
          )}
        />

        <Button
          variant="contained"
          size="large"
          sx={{ height: "50px" }}
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default App;
