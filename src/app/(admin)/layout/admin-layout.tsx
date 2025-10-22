"use client";

import {
  AppShell,
  ScrollArea,
  NavLink,
  Text,
  Menu,
  Avatar,
  Group,
  Stack,
  Badge,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { sidebarRoutes } from "../utils";
import { IconLogout } from "@tabler/icons-react";
import useUserStore from "@/Store/user-store";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [opened, { toggle }] = useDisclosure(true);
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() ?? "?";

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
          <Menu
            shadow="xl"
            width={260}
            radius="md"
            transitionProps={{ transition: "pop-top-right" }}
          >
            <Menu.Target>
              <Box className="cursor-pointer hover:scale-[1.02] transition-all bg-white rounded-full px-3 py-2 shadow-md hover:shadow-lg">
                <Group gap="xs" wrap="nowrap" justify="space-between">
                  <Avatar
                    color="green"
                    variant="light"
                    radius="xl"
                    className="bg-white/20"
                  >
                    {firstLetter}
                  </Avatar>

                  <Text size="xs" fw={600} lineClamp={1} className="text-white">
                    {user?.name || "Usuário"}
                  </Text>
                  <Badge size="xs" variant="outline">
                    {user?.role || "USUÁRIO"}
                  </Badge>
                </Group>
              </Box>
            </Menu.Target>

            <Menu.Dropdown>
              <Stack gap={0}>
                <Box p="md">
                  <Group gap="sm">
                    <Avatar
                      color="green"
                      variant="filled"
                      radius="xl"
                      size="lg"
                      className="shadow-md"
                    >
                      {firstLetter}
                    </Avatar>
                    <Stack gap={2}>
                      <Text fw={600} size="sm" lineClamp={1}>
                        {user?.name || "Usuário"}
                      </Text>

                      <Badge
                        size="sm"
                        variant="light"
                        color="green"
                        radius="sm"
                        leftSection={
                          <Box className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        }
                      >
                        {user?.role || "USUÁRIO"}
                      </Badge>
                    </Stack>
                  </Group>
                  <Text size="xs" c="dimmed" lineClamp={1} mt="sm">
                    {user?.email || "email não disponível"}
                  </Text>
                </Box>

                <Menu.Divider />

                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={18} stroke={1.5} />}
                  onClick={handleLogout}
                  className="rounded-md hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Text fw={500}>Sair</Text>
                </Menu.Item>
              </Stack>
            </Menu.Dropdown>
          </Menu>
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
