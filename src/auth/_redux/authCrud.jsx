import axios from "axios";

// export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/v1/clients/web/login`;
export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/api/login`;
export const REGISTER_URL = `${process.env.REACT_APP_API_URL}/api/signup`;
export const LOGOUT_URL = `${process.env.REACT_APP_API_URL}/api/logout`;
export const RESETPASSWORD_URL = `${process.env.REACT_APP_API_URL}/api/reset-password`;
export const FORGOTPASSWORD_URL = `${process.env.REACT_APP_API_URL}/api/forgot-password`;
// export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/api/userbyid`;

export function login(values) {
  return axios.post(LOGIN_URL, values);
}

export function register(values) {
  return axios.post(REGISTER_URL, values);
}
export function logout() {
  return axios.post(REGISTER_URL);
}

export function resetPassword(password) {
  return axios.post(RESETPASSWORD_URL, password);
}

export function forgotPassword(email) {
  return axios.post(FORGOTPASSWORD_URL, email);
}

export function getUserByToken(id) {
  const params = {
    id: id
  }
  // Authorization head should be fulfilled in interceptor.
  return axios.get(`${ME_URL}`, {
    params: { ...params }
  });
}
