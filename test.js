const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "AdminDashboard",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CreateAdmin ",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CreateFaculty",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CreateStudent",
      },
    ],
  },
];
const adminRoutes = adminPaths2.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: `<Navlink to=/admin/${item.path}>${item.name}</Navlink>`,
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: `<Navlink to=/admin/${child.path}>${child.name}</Navlink>`,
      })),
    });
  }

  return acc;
}, []);

console.log(adminRoutes);
