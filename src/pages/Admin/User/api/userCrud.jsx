import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/user`;

export function getAllUser(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}
export function getAll(queryParams) {
  return axios.get(`${CATE_URL}/`, queryParams);
}

export function createUser(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateAccountNotUser(values) {
  return axios.put(`${CATE_URL}/update-without-password`, values);
}

export function uploadImageUser(values) {
  return axios.post(`${CATE_URL}/upload-photo`, values);
}
export function updateUser(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
