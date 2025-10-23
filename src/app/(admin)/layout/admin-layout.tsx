"use client";

import { AppShell, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Header } from "@/components/header";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <AppShell
      padding="md"
      navbar={{
        width: collapsed ? 80 : 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      header={{ height: 70, collapsed: !isMobile }}
    >
      <Header />

      <Navbar collapsed={collapsed} />

      <AppShell.Main className="bg-gray-100">{children}</AppShell.Main>
    </AppShell>
  );
};
