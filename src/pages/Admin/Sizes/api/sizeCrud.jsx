import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/size`;


export function getAllSizes(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}
export function getAllSize(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}
export function getOneSize(queryParams) {
  return axios.get(`${CATE_URL}/findOne`, queryParams);
}
export function createSize(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateSize(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
export function deleteSize(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
