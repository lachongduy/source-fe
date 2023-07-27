import axios from "axios";
export const DASHBOARD_URL = `${process.env.REACT_APP_API_URL}/api/dashboard`;
export function getDashboardThongKe() {
  return axios.get(`${DASHBOARD_URL}/thong-ke`);
}
export function getDashboardChart(queryParams) {
  return axios.get(`${DASHBOARD_URL}/chart`, queryParams);
}
export function getDashboardTable(queryParams) {
  return axios.get(`${DASHBOARD_URL}/table`, queryParams);
}
