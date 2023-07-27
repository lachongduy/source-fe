import React from "react";
import { string } from "prop-types";
import WrapperTable from "../../../components/table/WrapperTable";
import { Typography } from "@mui/material";
const Table = ({ data }) => {
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "date", label: "Thời gian" },
    { id: "totalSales", label: "Tổng số lượng" },
    { id: "totalRevenue", label: "Tổng tiền" },
  ];
  const mapKey = [
    { label: "date", type: string },
    { label: "totalSales", type: string },
    { label: "totalRevenue", type: string },
  ];
  return (
    <div className="mt-5">
      <Typography variant="h6" className="text-center mb-5">
        Bảng thống kê đơn hàng đã bán theo ngày
      </Typography>
      <WrapperTable
        component={"Dashboard"}
        displayTableTitle={headRows}
        displayRowData={mapKey}
        data={data}
      />
    </div>
  );
};

export default Table;
