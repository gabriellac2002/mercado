import { Container, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";

type TitleProps = {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  rightSection?: React.ReactNode;
};

type PageLayoutProps = React.PropsWithChildren & TitleProps;

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  icon,
  description,
  className,
  rightSection,
}) => {
  return (
    <Container size="xl" py="md" className={`w-full ${className}`}>
      <Stack gap="lg">
        <Group align="flex-start" gap="xs" justify="space-between">
          <Group align="flex-start" gap="xs">
            {icon && (
              <ThemeIcon size="lg" variant="light" mt="xs">
                {icon}
              </ThemeIcon>
            )}
            <Stack gap={0}>
              <Title order={1}>{title}</Title>
              <Text size="sm" color="dimmed">
                {description}
              </Text>
            </Stack>
          </Group>
          {rightSection && <div>{rightSection}</div>}
        </Group>
        {children}
      </Stack>
    </Container>
  );
};
