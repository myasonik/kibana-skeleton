import Dashboard from "./dashboard/dashboard";
import DashboardIndex from "./dashboard/index";
import Discover from "./discover/discover";
import Home from "./home/home";

enum SOLUTIONS {
  KIBANA = "kibana",
  OBSERVABILITY = "observability",
}

export const orderedCategories = [
  {
    id: SOLUTIONS.KIBANA,
    icon: "logoKibana",
    label: "Kibana",
  },
  {
    id: SOLUTIONS.OBSERVABILITY,
    icon: "logoObservability",
    label: "Observability",
  },
];

export const routes = [
  {
    category: SOLUTIONS.KIBANA,
    label: "Discover",
    path: "/discover",
    component: Discover,
  },
  {
    category: SOLUTIONS.KIBANA,
    label: "Dashboard",
    path: "/dashboard",
    component: DashboardIndex,
    routes: [
      {
        path: "/dashboard/:id",
        component: Dashboard,
      },
    ],
  },
  {
    path: "/",
    component: Home,
  },
];
