
type FormItemProps = {
    label: string,
    updateState: (text: string) => void,
    type?: 'text' | 'email' | 'password'
}

export default function FormItem({label, updateState, type = 'text'}: FormItemProps) {

  return (
    <div className="form__item">
      <label className="form__label" htmlFor="">
        {label}
      </label>
      <input onInput={(event) => updateState(event.currentTarget.value)} className="form__input" type={type} />
    </div>
  );
}
