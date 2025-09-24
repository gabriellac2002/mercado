import AuthLayout from "@/layouts/auth/auth-layout";

export default function Layout(props: { children: React.ReactNode }) {
  return <AuthLayout>{props.children}</AuthLayout>;
}
