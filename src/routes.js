/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Search from "@material-ui/icons/Search";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage2 from "views/Dashboard/Dashboard-copy.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import TestPage from "views/Pruebas/Test.js";
import WelcomePage from "views/SuppliesFinder/Welcome.js";
import ManageSupplyRecordsPage from "views/Inventory/ManageSupplyRecords.js";
import RegisterNewEntryPage from "views/Inventory/RegisterNewEntry.js";
import ProductsLowStockPage from "views/Inventory/ProductsLowStock.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/find-supplies",
    name: "Inicio",
    rtlName: "inicio",
    icon: Search,
    component: WelcomePage,
    layout: "/admin",
  },
  {
    path: "/manage-records",
    name: "Gestionar Registros",
    rtlName: "Gestionar Registros",
    icon: SettingsApplicationsIcon,
    component: ManageSupplyRecordsPage,
    layout: "/admin",
  },
  {
    path: "/new-entry",
    name: "Nueva Entrada",
    rtlName: "Nueva Entrada",
    icon: AddBoxIcon,
    component: RegisterNewEntryPage,
    layout: "/admin",
  },
  {
    path: "/low-stock",
    name: "Baja existencia",
    rtlName: "Baja existencia",
    icon: PriorityHighIcon,
    component: ProductsLowStockPage,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard2",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardPage2,
  //   layout: "/admin"
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Tablero",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tests",
  //   name: "Pruebas",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: TestPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
