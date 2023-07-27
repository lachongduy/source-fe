import { Button, Card, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DashboardAnalytic from "./DashboardAnalytic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as dashboardAction from "./api/dashboardAction";
import Chart from "./Chart";
import Table from "./Table";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function convertDateToFormattedString(originalDate) {
  // Parse the original date using dayjs
  const parsedDate = dayjs(originalDate);

  // Format the parsed date in the desired format "YYYY-MM-DD"
  const formattedDate = parsedDate.format("YYYY-MM-DD");

  return formattedDate;
}

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dashboard }),
    shallowEqual
  );
  const { dataThongKe, chart, table } = currentState;
  const [filter, setFilter] = useState({
    fromDate: null,
    toDate: null,
  });
  const [valueFromDate, setValueFromDate] = React.useState(null);
  const [valueToDate, setValueToDate] = React.useState(null);
  useEffect(() => {
    dispatch(dashboardAction.getDashboardThongKe());
  }, []);
  useEffect(() => {
    dispatch(dashboardAction.getDashboardChart({ params: { ...filter } }));
  }, [filter, dispatch]);
  useEffect(() => {
    dispatch(dashboardAction.getDashboardTable({ params: { ...filter } }));
  }, [filter, dispatch]);
  const handleFilterDate = () => {
    setFilter({
      ...filter,
      fromDate: convertDateToFormattedString(new Date(valueFromDate)),
      toDate: convertDateToFormattedString(new Date(valueToDate)),
    });
  };
  const handleResetFilterDate = () => {
    setValueFromDate(null);
    setValueToDate(null);
    setFilter({
      fromDate: null,
      toDate: null,
    });
  };
  const isFiltered = valueFromDate !== null || valueToDate !== null;
  return (
    <div className="mx-5">
      <Card className="p-2">
        <Grid container spacing={1}>
          <Grid item xs={2.4}>
            <DashboardAnalytic
              children={
                <>
                  <LibraryBooksIcon className="text-blue-500 absolute" />
                </>
              }
              color="text-blue-500"
              title="Tổng đơn hàng"
              total={dataThongKe?.all}
            />
          </Grid>

          <Grid item xs={2.4}>
            <DashboardAnalytic
              children={
                <>
                  <AddTaskIcon className="text-black absolute" />
                </>
              }
              color="text-black"
              title="Đang chờ duyệt"
              total={dataThongKe?.waitingApproval}
            />
          </Grid>
          <Grid item xs={2.4}>
            <DashboardAnalytic
              children={
                <>
                  <AddTaskIcon className="text-green-500 absolute" />
                </>
              }
              color="text-green-500"
              title="Đã duyệt"
              total={dataThongKe?.approved}
            />
          </Grid>
          <Grid item xs={2.4}>
            <DashboardAnalytic
              children={
                <>
                  <LibraryBooksIcon className="text-red-600 absolute" />
                </>
              }
              color="text-red-600"
              title="Đã hủy"
              total={dataThongKe?.canceled}
            />
          </Grid>
          <Grid item xs={2.4}>
            <DashboardAnalytic
              children={
                <>
                  <LibraryBooksIcon className="text-orange-600 absolute" />
                </>
              }
              color="text-orange-600"
              title="Không được duyệt"
              total={dataThongKe?.notApproved}
            />
          </Grid>
        </Grid>
      </Card>
      <div className="my-5">
        <Chart data={chart} />
        <Stack direction="row" spacing={2} flexBasis="50%" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Từ ngày"
              value={valueFromDate}
              maxDate={dayjs(new Date())}
              onChange={(newValue) => setValueFromDate(newValue)}
            />
            <DatePicker
              label="Đến ngày"
              value={valueToDate}
              maxDate={dayjs(new Date())}
              onChange={(newValue) => setValueToDate(newValue)}
            />
          </LocalizationProvider>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleFilterDate()}>
            Lọc dữ liệu
          </Button>
          {isFiltered && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleResetFilterDate()}>
              Làm mới
            </Button>
          )}
        </Stack>
        <Table data={table} />
      </div>
    </div>
  );
};

export default DashboardPage;