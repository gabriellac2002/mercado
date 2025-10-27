import { NextPage } from "next";
import { redirect } from "next/navigation";
import "@mantine/dropzone/styles.css";

const Home: NextPage = () => {
  redirect("/login");
};

export default Home;
