import { sidebarRoutes } from "@/app/(admin)/utils";
import useUserStore from "@/Store/user-store";
import {
  AppShell,
  Avatar,
  Badge,
  Box,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { Logo } from "./logo";

type NavbarProps = {
  collapsed: boolean;
};

export const Navbar: React.FC<NavbarProps> = ({ collapsed }) => {
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() ?? "?";
  return (
    <AppShell.Navbar p="md" bg="green.6">
      {/* Logo / Nome */}
      {!collapsed && (
        <AppShell.Section>
          <div className="flex flex-col items-center py-4">
            <Logo />
          </div>
        </AppShell.Section>
      )}

      {/* Links */}
      <AppShell.Section grow component={ScrollArea} mt="md">
        <div className="flex flex-col gap-1">
          {sidebarRoutes.map((route) =>
            collapsed ? (
              <Tooltip label={route.name} position="right" key={route.path}>
                <NavLink
                  label=""
                  leftSection={<route.icon size={22} />}
                  component="a"
                  href={route.path}
                  className="rounded-md"
                  styles={{
                    root: {
                      color: "white",
                      justifyContent: "center",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    },
                  }}
                />
              </Tooltip>
            ) : (
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
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  },
                  label: { color: "white" },
                }}
              />
            )
          )}
        </div>
      </AppShell.Section>

      {/* Rodapé - Menu do usuário */}
      <AppShell.Section>
        <Menu shadow="xl" width={260} radius="md">
          <Menu.Target>
            <Box className="cursor-pointer hover:scale-[1.02] transition-all bg-white rounded-full px-3 py-2 shadow-md hover:shadow-lg">
              <Group gap="xs" wrap="nowrap" justify="space-between">
                <Avatar color="green" variant="light" radius="xl">
                  {firstLetter}
                </Avatar>
                {!collapsed && (
                  <>
                    <Text
                      size="xs"
                      fw={600}
                      lineClamp={1}
                      className="text-white"
                    >
                      {user?.name || "Usuário"}
                    </Text>
                    <Badge size="xs" variant="outline">
                      {user?.role || "USUÁRIO"}
                    </Badge>
                  </>
                )}
              </Group>
            </Box>
          </Menu.Target>

          <Menu.Dropdown>
            <Stack gap={0}>
              <Box p="md">
                <Group gap="sm">
                  <Avatar color="green" variant="filled" radius="xl" size="lg">
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
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {user?.email || "email não disponível"}
                    </Text>
                  </Stack>
                </Group>
              </Box>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={<IconLogout size={18} stroke={1.5} />}
                onClick={handleLogout}
              >
                Sair
              </Menu.Item>
            </Stack>
          </Menu.Dropdown>
        </Menu>

        {!collapsed && (
          <Text size="xs" ta="center" c="green.1" mt="md" mb="xs" opacity={0.8}>
            © 2025 Mercado do Laerte
          </Text>
        )}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
