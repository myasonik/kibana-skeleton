import Maps from "./maps/maps";

enum SOLUTIONS {
  KIBANA = "Analytics",
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
    label: "Maps",
    path: "/",
    component: Maps,
  },
  
];
