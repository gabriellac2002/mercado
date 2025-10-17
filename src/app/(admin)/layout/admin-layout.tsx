"use client";

import { AppShell, ScrollArea, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { sidebarRoutes } from "../utils";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md" bg="green.6">
        <AppShell.Section>
          {/* Logo e Nome */}
          <div className="flex flex-col items-center py-6 px-4">
            <div className="bg-white rounded-full p-3 mb-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <Text size="lg" fw={700} c="white" ta="center" lh={1.2}>
              Mercadinho
              <br />
              do Laerte
            </Text>
          </div>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea} mt="md">
          <div className="flex flex-col gap-1">
            {sidebarRoutes.map((route) => (
              <NavLink
                key={route.path}
                label={route.name}
                leftSection={<route.icon size={20} />}
                component="a"
                href={route.path}
                className="rounded-md"
                styles={{
                  root: {
                    color: "white",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                  label: {
                    color: "white",
                  },
                }}
              />
            ))}
          </div>
        </AppShell.Section>

        {/* Rodapé */}
        <AppShell.Section>
          <Text size="xs" ta="center" c="green.1" mt="md" mb="xs" opacity={0.8}>
            © 2025 Mercado do Laerte
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>

      {/* Conteúdo principal */}
      <AppShell.Main className="bg-gray-100">{children}</AppShell.Main>
    </AppShell>
  );
};
