import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/color`;
// READ
// export function getAllCatetory() {
//   return axios.get(`${CATE_URL}/all`);
// }

export function getAllColors(queryParams) {
  return axios.get(`${CATE_URL}/all`, queryParams);
}
export function getAllColor(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}

export function createColor(values) {
  return axios.post(`${CATE_URL}/create`, values);
}
export function updateColor(values) {
  return axios.put(`${CATE_URL}/update`, values);
}
export function deleteColor(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
