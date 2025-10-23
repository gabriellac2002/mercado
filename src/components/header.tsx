import { ActionIcon, AppShell, NavLink, Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { Logo } from "./logo";
import { sidebarRoutes } from "@/app/(admin)/utils";
import { useDisclosure } from "@mantine/hooks";

export const Header: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <AppShell.Header
        bg="green.6"
        className="flex justify-between items-center px-2"
      >
        <Logo isRow />

        <ActionIcon
          variant="light"
          color="white"
          onClick={open}
          className="sm:hidden"
        >
          <IconMenu2 size={22} />
        </ActionIcon>
      </AppShell.Header>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding={0}
        color={"green.6"}
        title={
          <div className="mx-1 my-1">
            <Logo isRow />
          </div>
        }
        styles={{
          content: { backgroundColor: "#16a34a" },
          header: { backgroundColor: "#16a34a" },
        }}
      >
        <div className="p-4 space-y-1 text-white">
          {sidebarRoutes.map((route) => (
            <NavLink
              key={route.path}
              label={route.name}
              leftSection={<route.icon size={22} />}
              component="a"
              href={route.path}
              classNames={{
                root: "text-white font-semibold p-3.5 rounded-xl transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/15 hover:translate-x-1 hover:border-white/30",
                label: "text-sm",
                section: "text-white/90",
              }}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
};
