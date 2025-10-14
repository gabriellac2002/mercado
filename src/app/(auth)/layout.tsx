import { AuthLayout } from "./layout/auth-layout";

export default function Layout(props: { children: React.ReactNode }) {
  return <AuthLayout>{props.children}</AuthLayout>;
}
