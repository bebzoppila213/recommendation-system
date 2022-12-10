import { useState } from "react";

export type OptionType = {
  text: string;
  value: string;
};

type CustomSelectProps = {
  options: OptionType[];
  multiple?: boolean;
  label?: string,
  onSelected: (data: string | string[]) => void,
  classWrapper?: string
};

export default function CustomSelect({
  options,
  multiple = false,
  label,
  onSelected,
  classWrapper = "col-md-12 form-it"
}: CustomSelectProps) {

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      changeMultiple(event);
    } else {
      let selectValue = event.currentTarget.value;
      onSelected(selectValue)
    }
  };

  const changeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const data = event.currentTarget.children as HTMLCollectionOf<HTMLOptionElement>;

    let selectMultipleValue: string[] = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.selected) {
        selectMultipleValue.push(element.value);
      }
    }

    onSelected(selectMultipleValue)
    
  };

  return (
    <div className={classWrapper}>
      <label>{label}</label>
      <div className="group-ip">
        <select
          name="skills"
          multiple={multiple}
          className={"ui fluid dropdown " + ( multiple ? "select-multiplay" : '')}
          onChange={onChangeSelect}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
          <option>Очистить</option>
        </select>
      </div>
    </div>
  );
}
