import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/type`;


export function getAllTypeProductCustomer(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}
export function getAllTypeProduct(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}


export function createTypeProduct(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateTypeProduct(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
export function deleteTypeProduct(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
