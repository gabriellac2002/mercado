import { SetUpLayout } from "./layout/setup-layout";

export default function Layout(props: { children: React.ReactNode }) {
  return <SetUpLayout>{props.children}</SetUpLayout>;
}
