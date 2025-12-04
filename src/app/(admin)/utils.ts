import { FaUsers, FaShoppingCart, FaTags } from "react-icons/fa";
import { TbFileUpload } from "react-icons/tb";
import { IconType } from "react-icons";

export interface SidebarRoute {
  path: string;
  name: string;
  icon: IconType;
}

export const sidebarRoutes: SidebarRoute[] = [
  {
    path: "/shopping",
    name: "Compras",
    icon: FaShoppingCart,
  },
  {
    path: "/user",
    name: "Usuarios",
    icon: FaUsers,
  },
  {
    path: "/products",
    name: "Produtos",
    icon: FaShoppingCart,
  },
  {
    path: "/category",
    name: "Categorias",
    icon: FaTags,
  },
  {
    path: "/upload",
    name: "Upload",
    icon: TbFileUpload,
  },
];
