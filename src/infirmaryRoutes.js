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
import AssignmentIcon from "@material-ui/icons/Assignment";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Search from "@material-ui/icons/Search";
import DashboardPage from "views/Dashboard/Dashboard.js";
import WelcomePage from "views/SuppliesFinder/Welcome.js";
import RequestSupplyValePage from "views/Infirmary/RequestSupplyVale.js";
import RequestSupplyMemorandumPage from "views/Infirmary/RequestSupplyMemorandum.js";
import AwaitingRequestPage from "views/Infirmary/AwaitingRequest.js";
import RequestHistoryPage from "views/Infirmary/RequestHistory.js";
import VoucherHistoryPage from "views/Infirmary/VoucherHistory.js";
import MemorandumHistoryPage from "views/Infirmary/MemorandumHistory.js";
import ProductsLowStockPage from "views/Inventory/ProductsLowStock.js";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const dashboardRoutes = [
  {
    path: "/find-supplies",
    name: "Inicio",
    rtlName: "inicio",
    icon: Search,
    component: WelcomePage,
    layout: "/infirmary",
  },
  {
    path: "/supply-order",
    name: "Generar vale",
    rtlName: "Generar vale",
    icon: AddBoxIcon,
    component: RequestSupplyValePage,
    layout: "/infirmary",
  },
  {
    path: "/purchase-order",
    name: "Generar memorandum",
    rtlName: "Generar memorandum",
    icon: AddBoxIcon,
    component: RequestSupplyMemorandumPage,
    layout: "/infirmary",
  },
  {
    path: "/voucher-history",
    name: "Vales",
    rtlName: "Vales",
    icon: AssignmentTurnedInIcon,
    component: VoucherHistoryPage,
    layout: "/infirmary",
  },
  {
    path: "/memorandum-history",
    name: "Memorandums",
    rtlName: "Memorandums",
    icon: AssignmentTurnedInIcon,
    component: MemorandumHistoryPage,
    layout: "/infirmary",
  },
  // {
  //   path: "/awaiting-requests",
  //   name: "Solicitudes Pendientes",
  //   rtlName: "Solicitudes Pendientes",
  //   icon: AssignmentIcon,
  //   component: AwaitingRequestPage,
  //   layout: "/infirmary",
  // },
  // {
  //   path: "/request-history",
  //   name: "Historial de Solicitudes",
  //   rtlName: "Historial de Solicitudes",
  //   icon: AssignmentTurnedInIcon,
  //   component: RequestHistoryPage,
  //   layout: "/infirmary",
  // },
  {
    path: "/low-stock",
    name: "Baja existencia",
    rtlName: "Baja existencia",
    icon: PriorityHighIcon,
    component: ProductsLowStockPage,
    layout: "/infirmary",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Tablero",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/infirmary",
  },
];

export default dashboardRoutes;
