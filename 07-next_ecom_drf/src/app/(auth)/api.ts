import { API_URL } from "@/lib/api";
import axios from "axios";
import Cookies from "js-cookie";

export const loginApi = async (values: any) => {
  const response = axios.post(`${API_URL}/user/login/`, {
    email: values.email,
    password: values.password,
  });

  return response;
};

export const signupApi = async (values: any) => {
  const response = axios.post(`${API_URL}/user/signup/`, {
    name: values.name,
    email: values.email,
    password: values.password,
    address: values.address,
    contact: values.contact,
  });
  return response;
};
