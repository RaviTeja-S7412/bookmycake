import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  ClipboardDocumentCheckIcon,
  CakeIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { element } from "prop-types";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon:< ShoppingBagIcon {...icon}/>,
        name:"Orders",
        path:"/orders",
        element,
      },
      {
        icon:<ClipboardDocumentCheckIcon {...icon}/>,
        name:"Inventory",
        path:"/inventory"
      },
      {
        icon:<CakeIcon {...icon}/>,
        name:"Products",
        path:"/products"
      },
      {
        icon:<UserGroupIcon {...icon} />,
        name:"Customers",
        path:"/customers"
      },
      {
        icon:<ChartBarIcon {...icon}/>,
        name:"Sales & Reports",
        path:"/sales"
      }
    ],
  },
];

export default routes;
