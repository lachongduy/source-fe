import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/image`;

export function getAllImage(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}
export function getAllImageCustomer(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}

export function createImage(values) {
  return axios.post(`${CATE_URL}/upload-photo`, values);
}
export function deleteImage(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
export function updateImage(values) {
  return axios.put(`${CATE_URL}/update`, values);
}


