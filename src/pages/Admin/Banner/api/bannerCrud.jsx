import axios from "axios";
export const CATE_URL = `${process.env.REACT_APP_API_URL}/api/banner`;

export function getAllBanner(queryParams) {
  return axios.get(`${CATE_URL}/search`, queryParams);
}

export function createBanner(values) {
  return axios.post(`${CATE_URL}/upload`, values);
}
export function deleteBanner(id) {
  return axios.delete(`${CATE_URL}/delete/${id}`);
}
export function updateBanner(values) {
  return axios.put(`${CATE_URL}/update`, values);
}


