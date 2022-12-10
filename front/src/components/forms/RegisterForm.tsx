import React, { useMemo, useState } from "react";
import FormItem from "./FormItem";
import { useAppDispatch } from "../../hooks/redux";
import { registerUser } from "../../state/api/user"
import useForm from "../../hooks/useForm"

type FormStateType = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type ValidateFormType = {
  key: keyof FormStateType;
  pattern: RegExp;
};

const validate: ValidateFormType[] = [
  {
    key: "name",
    pattern: /.{3,}/,
  },
  {
    key: "email",
    pattern: /.{3,}@.{3,}/,
  },
  {
    key: "password",
    pattern: /.{3,}/,
  },
  {
    key: "repeatPassword",
    pattern: /.{3,}/,
  },
];

const defaultFormState: FormStateType = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
}

export default function RegisterForm() {
  const {formIsvalid, formState, updateFormState }  = useForm<FormStateType>(defaultFormState, validate)

  const dispatcher = useAppDispatch()

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault()
    if(formIsvalid && formState.password === formState.repeatPassword){
      dispatcher(registerUser(formState))
    }
  }

  return (
    <form onSubmit={submitForm} className="form">
      <h3 className="form__title">Регистрация</h3>
      <FormItem
        updateState={(text) => updateFormState("name", text)}
        label="Имя"
      ></FormItem>
      <FormItem
        updateState={(text) => updateFormState("email", text)}
        label="почта"
        type="email"
      ></FormItem>
      <FormItem
        updateState={(text) => updateFormState("password", text)}
        label="пароль"
        type="password"
      ></FormItem>
      <FormItem
        updateState={(text) => updateFormState("repeatPassword", text)}
        label="Повторите пароль"
        type="password"
      ></FormItem>
      <button disabled={!formIsvalid} className="form__btn">
        Регистрация
      </button>
    </form>
  );
}
