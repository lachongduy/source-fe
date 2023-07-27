import React from "react";
import Layout from "../../layouts/Layout";
import DashboardPage from "./Dashboard/DashboardPage";
const AdminPage = () => {
  return (
    <>
      <Layout>
        <DashboardPage></DashboardPage>
      </Layout>
    </>
  );
};

export default AdminPage;
