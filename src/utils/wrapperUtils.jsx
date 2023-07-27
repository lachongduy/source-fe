export const convertToVND = (number) => {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const generateRandomOrderId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderId += characters.charAt(randomIndex);
  }
  return orderId;
};

export const permissions = [
  {
    module: "Danh Mục",
    permission: [
      { title: "Thêm", key: "CREATE_DANH_MUC" },
      { title: "Xóa", key: "DELETE_DANH_MUC" },
      { title: "Cập nhật", key: "UPDATE_DANH_MUC" },
    ],
  },
  {
    module: "Ảnh bìa",
    permission: [
      { title: "Thêm", key: "CREATE_ANH_BIA" },
      { title: "Xóa", key: "DELETE_ANH_BIA" },
      { title: "Cập nhật", key: "UPDATE_ANH_BIA" },
    ],
  },
  {
    module: "Bài Viết",
    permission: [
      { title: "Thêm", key: "CREATE_BAI_VIET" },
      { title: "Xóa", key: "DELETE_BAI_VIET" },
      { title: "Cập nhật", key: "UPDATE_BAI_VIET" },
    ],
  },
  {
    module: "Đơn hàng",
    permission: [
      { title: "Thêm", key: "CREATE_DON_HANG" },
      { title: "Duyệt đơn", key: "DUYET_DON_HANG" },
      { title: "Không duyệt ", key: "KHONG_DUYET_DON_HANG" },
    ],
  },
  {
    module: "Sản phẩm",
    permission: [
      { title: "Thêm", key: "CREATE_SAN_PHAM" },
      { title: "Xóa", key: "DELETE_SAN_PHAM" },
      { title: "Cập nhật", key: "UPDATE_SAN_PHAM" },
    ],
  },
  {
    module: "Loại Sản Phẩm",
    permission: [
      { title: "Thêm", key: "CREATE_LOAI_SAN_PHAM" },
      { title: "Xóa", key: "DELETE_LOAI_SAN_PHAM" },
      { title: "Cập nhật", key: "UPDATE_LOAI_SAN_PHAM" },
    ],
  },
  {
    module: "Màu sắc",
    permission: [
      { title: "Thêm", key: "CREATE_MAU_SAC" },
      { title: "Xóa", key: "DELETE_MAU_SAC" },
      { title: "Cập nhật", key: "UPDATE_MAU_SAC" },
    ],
  },
  {
    module: "Size",
    permission: [
      { title: "Thêm", key: "CREATE_SIZE" },
      { title: "Xóa", key: "DELETE_SIZE" },
      { title: "Cập nhật", key: "UPDATE_SIZE" },
    ],
  },
  {
    module: "Ảnh sản phẩm",
    permission: [
      { title: "Thêm", key: "CREATE_ANH" },
      { title: "Xóa", key: "DELETE_ANH" },
      { title: "Cập nhật", key: "UPDATE_ANH" },
    ],
  },
];
