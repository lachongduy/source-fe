import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/order`;

export function getAllOrder(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}
export function createOrder(queryParams) {
  return axios.post(`${CATE_URL}/create`, queryParams);
}
export function getAllOrderByUserId(queryParams) {
  return axios.get(`${CATE_URL}/byUserId`, queryParams);
}
//2
export function deleteOrder(id, values) {
  return axios.put(`${CATE_URL}/delete/${id}`, values);
}
//1
export function updateStatusSuccess(id) {
  return axios.put(`${CATE_URL}/update/${id}`);
}
//3
export function updateStatusCancelOfAdmin(id) {
  return axios.put(`${CATE_URL}/UpdateCancel/${id}`);
}
export function exportExcel(queryParams) {
  return axios.get(`${CATE_URL}/excel`, {
    params: queryParams,
    responseType: "blob",
  });
}