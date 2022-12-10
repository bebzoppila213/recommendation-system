import useForm from "../../hooks/useForm";
import FormItem from "./FormItem";
import { authUser } from "../../state/api/user"
import { useAppDispatch } from "../../hooks/redux";

type FormStateType = {
  email: string;
  password: string;
};
type ValidateFormType = {
  key: keyof FormStateType;
  pattern: RegExp;
};

const defaultFormState: FormStateType = {
  email: "",
  password: "",
};
const validate: ValidateFormType[] = [
  {
    key: "email",
    pattern: /.{3,}/,
  },
  {
    key: "password",
    pattern: /.{3,}/,
  },
];

export default function AuthForm() {
  const { formIsvalid, formState, updateFormState } = useForm<FormStateType>(
    defaultFormState,
    validate
  );
  const dispatcher = useAppDispatch()

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault()
    if(formIsvalid){
      dispatcher(authUser(formState))
    }
  };

  return (
    <form onSubmit={submitForm} className="form">
      <h3 className="form__title">Регистрация</h3>
      <FormItem
        updateState={(text) => updateFormState("email", text)}
        label="Имя"
      ></FormItem>
      <FormItem
        updateState={(text) => updateFormState("password", text)}
        label="пароль"
        type="password"
      ></FormItem>
      <button disabled={!formIsvalid} className="form__btn">
        Авторизация
      </button>
    </form>
  );
}
