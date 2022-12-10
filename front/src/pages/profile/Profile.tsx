import { useState } from "react";
import CustomInput from "../../components/ui/CustomInput";
import { useAppSelector } from "../../hooks/redux";




export default function Profile(){
    const user = useAppSelector(state => state.user)

    const profileState = useState({})
    const updateProfileState = (text: string) => {

    }
    return(
        <div className="col-md-9 col-sm-12 col-xs-12">
        <div className="form-style-1 user-pro" >
        <form action="#" className="user">
          <h4>01. Даныне профилья</h4>
          <div className="row">
              <CustomInput defaultValue={user.user.name} classInner="col-md-6 form-it" updateState={updateProfileState}  label="Ваш логин"></CustomInput>
              <CustomInput defaultValue={user.user.email} classInner="col-md-6 form-it" updateState={updateProfileState}  label="Ваша почта"></CustomInput>
          </div>
          <div className="row">
          <CustomInput classInner="col-md-6 form-it" updateState={updateProfileState}  label="Ваше имя"></CustomInput>
          <CustomInput classInner="col-md-6 form-it" updateState={updateProfileState}  label="Ваша фамилия"></CustomInput>
          </div>
          <div className="row">
            <div className="col-md-2">
              <input className="submit" type="submit" value="save" />
            </div>
          </div>
        </form>
        <form action="#" className="password">
          <h4>02. Изменение пароля</h4>
          <div className="row">
            <div className="col-md-6 form-it">
              <label>Old Password</label>
              <input type="text" placeholder="**********" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-it">
              <label>New Password</label>
              <input type="text" placeholder="***************" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-it">
              <label>Confirm New Password</label>
              <input type="text" placeholder="*************** " />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <input className="submit" type="submit" value="change" />
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}