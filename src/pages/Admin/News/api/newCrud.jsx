import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/new`;

export function getAllNew(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}
export function getByIdNew(id) {
  return axios.get(`${CATE_URL}/getId/${id}`);
}
export function createNew(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateNew(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
export function deleteNew(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}


