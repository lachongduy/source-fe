import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/product`;

export function getAllProduct(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}
export function getAllProductCustomer(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}
export function getByIdProduct(id) {
  return axios.get(`${CATE_URL}/getId/${id}`);
}
export function createProduct(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateProduct(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
export function deleteProduct(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
