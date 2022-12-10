import axios from "axios";

type RegisterUserResponseData = {
  data: { token: string };
  ok: boolean;
};

type UserRegisterProps = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export async function registerUser(data: UserRegisterProps) {
  const response = await axios.post<RegisterUserResponseData>(
    "http://localhost:8090/user/register",
    data
  );
  if(response.data.ok){
    return {name: data.name, email: data.email, token: response.data.data.token}
  }
  return null
}
