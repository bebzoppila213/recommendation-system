

type CustomInputProps = {
    label: string,
    updateState: (text: string) => void,
    classInner: string,
    defaultValue?: string
}

export default function CustomInput({label, updateState, classInner, defaultValue=''}: CustomInputProps){
    // "col-md-12 form-it"
    return(
        <div className={classInner} >
              <label>{label}</label>
              <input defaultValue={defaultValue} onChange={(event) => updateState(event.currentTarget.value)} type="text" placeholder="" />
        </div>
    )
}