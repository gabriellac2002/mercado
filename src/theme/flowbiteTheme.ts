import { createTheme } from "flowbite-react";

export const customFlowbiteTheme = createTheme({
  sidebar: {
    root: {
      base: "h-full bg-white",
      inner: "h-full overflow-y-auto overflow-x-hidden bg-white px-3 py-4",
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-3 text-base font-medium transition-all duration-200",
      active:
        "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-200",
      content: {
        base: "flex-1 whitespace-nowrap px-3",
      },
      icon: {
        base: "h-5 w-5 flex-shrink-0 transition duration-75",
        active: "text-white",
      },
    },
    itemGroup: {
      base: "space-y-2",
    },
  },
  button: {
    color: {
      primary: "bg-green-600 hover:bg-green-700 text-white",
      success: "bg-green-500 hover:bg-green-600 text-white",
    },
  },
});
