import { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage = () => {
  redirect("/login");
};

export default Home;
