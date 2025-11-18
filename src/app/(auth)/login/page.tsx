"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { Form } from "./components/form";
import useUserStore from "@/Store/user-store";
import { useEffect } from "react";
import { Center, Loader } from "@mantine/core";
import { useRouter } from "next/navigation";

const LoginView: React.FC = () => {
  const { initializing } = useAuth();
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && user) {
      router.push("/user");
    }
  }, [initializing, user, router]);

  if (initializing) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  if (user) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  return <Form />;
};

export default LoginView;
