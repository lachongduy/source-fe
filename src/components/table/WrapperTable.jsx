import {
  Box,
  Chip,
  IconButton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import vi from "moment/locale/vi";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { convertToVND } from "../../utils/wrapperUtils";
import Label from "../labelStatus/Label";
import TableSkeleton from "./TableSkeleton";
import { shallowEqual, useSelector } from "react-redux";
const mappingKey = {
  User: "Người dùng",
  Personnel: "Nhân viên",
  Manager: "Quản lý",
};
export const mappingColor = {
  Personnel: "success", // Màu "success" cho giá trị "Personnel"
  Manager: "primary", // Màu "primary" cho giá trị "Manager"
  User: "warning", // Màu "warning" cho giá trị "Admin"
};
const WrapperTable = (props) => {
  const { authState } = useSelector(
    (state) => ({ authState: state.auth }),
    shallowEqual
  );
  const { user } = authState;
  const handeDelete = (id) => {
    props.onDeleteRow(id);
  };
  function handleEdit(row) {
    props.onEditRow(row);
  }
  function handleChangePage(event, newPage) {
    props.onChangePage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    props.onChangeRowsPerPage(+event.target.value);
  }
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }} className="overflow-scroll">
        {props.listLoading ? (
          <TableSkeleton />
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {props.displayTableTitle.map((row) => (
                  <TableCell key={"h" + row.id}>
                    <span className="font-weight-bolder text-white-75 font-size-lg">
                      {row.label}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data?.map((row, index) => {
                return (
                  <TableRow key={index} hover>
                    <TableCell align="left">{index + 1}</TableCell>
                    {props.displayRowData.map((item, idx) => {
                      if (item.label === "status") {
                        if (row.status === true) {
                          return (
                            <TableCell key={idx}>
                              <Chip
                                variant="filled"
                                color="primary"
                                label="Đang hoạt động"
                                size="small"
                              />
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={idx}>
                              <Chip
                                variant="filled"
                                color="error"
                                label="Đã xóa"
                                size="small"
                              />
                            </TableCell>
                          );
                        }
                      }
                      if (item.label === "banned") {
                        if (row.banned === false) {
                          return (
                            <TableCell key={idx}>
                              <Chip
                                variant="filled"
                                color="primary"
                                label="Hoạt động"
                                size="small"
                              />
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={idx}>
                              <Chip
                                variant="filled"
                                color="error"
                                label="Ngừng hoạt động"
                                size="small"
                              />
                            </TableCell>
                          );
                        }
                      }
                      if (item.label === "createdAt") {
                        return (
                          <TableCell key={idx}>
                            {moment(row[item.label])
                              .locale("vi", vi)
                              .format("L")}
                          </TableCell>
                        );
                      }
                      if (
                        item.label === "imageBanner" ||
                        item.label === "imageNew" ||
                        item.label === "image" ||
                        item.label === "imageColor" ||
                        item.label === "imageProduct"
                      ) {
                        return (
                          <TableCell key={idx}>
                            <img
                              src={row[item.label]}
                              alt="Ảnh lỗi"
                              className="min-w-[150px] h-[90px]"
                            />
                          </TableCell>
                        );
                      }
                      if (item.label === "title") {
                        return (
                          <TableCell sx={{ minWidth: "250px" }} key={idx}>
                            {row[item.label]}
                          </TableCell>
                        );
                      }
                      if (item.label === "sizes") {
                        return (
                          <TableCell sx={{ minWidth: "200px" }} key={idx}>
                            <Stack direction="row" gap={1} flexWrap="wrap">
                              {row.sizes.map((item, idx) => (
                                <Stack direction="row" spacing={2} key={idx}>
                                  <Label variant="soft" color="success">
                                    {item.size.name}
                                  </Label>
                                  <Typography>
                                    Số lượng:
                                    <span className="text-blue-500 font-medium ml-1">
                                      {item?.quantity}
                                    </span>
                                  </Typography>
                                </Stack>
                              ))}
                            </Stack>
                          </TableCell>
                        );
                      }
                      if (item.label === "colors") {
                        if (props.component === "Colors") {
                          return (
                            <TableCell sx={{ minWidth: "330px" }} key={idx}>
                              <Stack direction="row" gap={1} flexWrap="wrap">
                                {row.colors.map((item, idx) => (
                                  <Stack direction="row" spacing={2} key={idx}>
                                    <Label variant="soft" color="success">
                                      {item.name}
                                    </Label>
                                    <Typography>
                                      Số lượng:
                                      <span className="text-blue-500 font-medium ml-1">
                                        {item.quantity}
                                      </span>
                                    </Typography>
                                  </Stack>
                                ))}
                              </Stack>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell sx={{ minWidth: "330px" }} key={idx}>
                              <Stack direction="row" gap={1} flexWrap="wrap">
                                {row.colors.map((item, idx) => (
                                  <Stack direction="row" spacing={2} key={idx}>
                                    <Label variant="soft" color="success">
                                      {item.name}
                                    </Label>
                                    <Typography>
                                      Số lượng:
                                      <span className="text-blue-500 font-medium ml-1">
                                        {item?.sizes?.reduce(
                                          (accumulator, currentItem) => {
                                            return (
                                              accumulator + currentItem.quantity
                                            );
                                          },
                                          0
                                        )}
                                      </span>
                                    </Typography>
                                  </Stack>
                                ))}
                              </Stack>
                            </TableCell>
                          );
                        }
                      }

                      if (
                        item.label === "price" ||
                        item.label === "price_discount" ||
                        item.label === "totalRevenue"
                      ) {
                        return (
                          <TableCell sx={{ minWidth: "200px" }} key={idx}>
                            {convertToVND(row[item.label])}
                          </TableCell>
                        );
                      }
                      if (item.label === "name") {
                        return (
                          <TableCell sx={{ minWidth: "250px" }} key={idx}>
                            {row[item.label]}
                          </TableCell>
                        );
                      }
                      if (item.label === "soluong_sanpham") {
                        return (
                          <TableCell sx={{ minWidth: "170px" }} key={idx}>
                            {row[item.label]}
                          </TableCell>
                        );
                      }
                      if (item.label === "role") {
                        return (
                          <TableCell sx={{ minWidth: "200px" }} key={idx}>
                            <Stack direction="row" gap={1} flexWrap="wrap">
                              <Label
                                variant="soft"
                                color={mappingColor[row[item.label]]}>
                                {mappingKey[row[item.label]]}
                              </Label>
                            </Stack>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={idx} sx={{ minWidth: "150px" }}>
                          {row[item.label]}
                        </TableCell>
                      );
                    })}
                    {/* {(
                      props.component === "Image") && (
                        <TableCell align="left" sx={{ minWidth: "180px" }}>
                          <Stack direction="row" spacing={1}>
                            <IconButton onClick={(e) => handleEdit(row)}>
                              <FiEdit className="text-blue-500"></FiEdit>
                            </IconButton>
                            <IconButton onClick={(e) => handeDelete(row._id)}>
                              <BsTrash className="text-red-500"></BsTrash>
                            </IconButton>
                          </Stack>
                        </TableCell>
                      )} */}
                    {/* danh mục */}
                    {props.component === "Category" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_DANH_MUC")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_DANH_MUC")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* ảnh bìa */}
                    {props.component === "Banners" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_ANH_BIA")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_ANH_BIA")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* bài viết */}
                    {props.component === "New" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_BAI_VIET")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_BAI_VIET")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* sản phẩm */}
                    {props.component === "Product" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_SAN_PHAM")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_SAN_PHAM")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* loại sp */}
                    {props.component === "typeProducts" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_LOAI_SAN_PHAM")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_LOAI_SAN_PHAM")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* màu sắc */}
                    {props.component === "Colors" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_MAU_SAC")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_MAU_SAC")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* size */}
                    {props.component === "Sizes" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_SIZE")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_SIZE")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {/* ảnh sp */}
                    {props.component === "Image" && (
                      <TableCell align="left" sx={{ minWidth: "180px" }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            disabled={
                              !user?.permissions?.includes("UPDATE_ANH")
                            }
                            onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                          <IconButton
                            onClick={(e) => handeDelete(row._id)}
                            disabled={
                              !user?.permissions?.includes("DELETE_ANH")
                            }>
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                    {props.component === "User" &&
                      (row.role === "Manager" || row.role === "Personnel") && (
                        <TableCell align="left" sx={{ minWidth: "180px" }}>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              onClick={(e) => handleEdit(row)}
                              disabled={user?.role !== "Admin"}>
                              <FiEdit className="text-blue-500"></FiEdit>
                            </IconButton>
                            <IconButton
                              onClick={(e) => handeDelete(row._id)}
                              disabled={user?.role !== "Admin"}>
                              <BsTrash className="text-red-500"></BsTrash>
                            </IconButton>
                          </Stack>
                        </TableCell>
                      )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {props.component !== "Dashboard" && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={props.total || 0}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          labelRowsPerPage="Số dòng mỗi trang"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default WrapperTable;
