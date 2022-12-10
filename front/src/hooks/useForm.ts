import { useMemo, useState } from "react";


type ValidateFormType<T> = {
    key: (keyof T) ,
    pattern: RegExp;
  };

export default function useForm<T extends object>(defaultState: T, validate: ValidateFormType<T>[]){
    const [formState, setFormState] = useState<T>(defaultState)

    const updateFormState = (key: keyof T, value: string) => {
        setFormState({ ...formState, [key]: value });
    }

    const formIsvalid = useMemo(
        () =>
          validate.every((validateItem) =>
            validateItem.pattern.test(String(formState[validateItem.key]))
          ),
        [formState]
      );

      return{
        formState,
        updateFormState,
        formIsvalid
      }
}