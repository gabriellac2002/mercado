import { FaUsers } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SidebarRoute {
  path: string;
  name: string;
  icon: IconType;
}

export const sidebarRoutes: SidebarRoute[] = [
  {
    path: "/(admin)/user",
    name: "Usuarios",
    icon: FaUsers,
  },
];
