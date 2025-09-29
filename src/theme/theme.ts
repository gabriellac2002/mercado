import { createTheme, MantineColorsTuple } from "@mantine/core";

// Paleta de cores verde personalizada
const greenTheme: MantineColorsTuple = [
  "#f0fdf4",
  "#dcfce7",
  "#bbf7d0",
  "#86efac",
  "#4ade80",
  "#22c55e",
  "#16a34a",
  "#15803d",
  "#166534",
  "#14532d",
];

export const theme = createTheme({
  primaryColor: "green",
  colors: {
    green: greenTheme,
  },
  primaryShade: { light: 6, dark: 8 },
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontFamilyMonospace: "var(--font-geist-mono), monospace",
  headings: {
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
  },
  other: {
    // Cores adicionais para o tema
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
});
