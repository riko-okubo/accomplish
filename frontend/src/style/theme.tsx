import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#FFFEF8",
        color: "BlackAlpha.700",
      },
    },
  },
  colors: {
    teal: {
      50: "#DBE9E8",
      200: "#B1E5DC",
      500: "#0fa3b1",
    },
    yellow: {
      200: "#F5E6AA",
    },
    orange: {
      200: "#f7a072",
    },
  },
});

export { theme };
