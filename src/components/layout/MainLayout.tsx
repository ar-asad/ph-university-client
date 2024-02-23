import { Button, Layout } from "antd";

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/auth/authSlice";
const { Header, Content, Footer } = Layout;

//hard coded side bar...
// const items: MenuProps["items"] = [
//   {
//     key: "Dashboard",
//     label: <NavLink to="/admin/dashboard">Dashboard </NavLink>,
//   },
//   {
//     key: "User Management",
//     label: "User-Mangement",
//     children: [
//       {
//         key: "Create Admin",
//         label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
//       },
//       {
//         key: "Create Student",
//         label: <NavLink to="/admin/create-student">Create Student</NavLink>,
//       },
//       {
//         key: "Create faculty",
//         label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogOut}>LogOut</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
