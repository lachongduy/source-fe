
export const TINH_URL = `https://provinces.open-api.vn/api/?depth=3`;

// READ
export function getAllTinh() {
  return fetch(TINH_URL);
}
