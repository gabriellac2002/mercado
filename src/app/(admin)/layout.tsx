import { AdminLayout } from "./layout/admin-layout";

export default function Layout(props: { children: React.ReactNode }) {
  return <AdminLayout>{props.children}</AdminLayout>;
}
