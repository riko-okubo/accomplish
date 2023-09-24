import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./style/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./context/UserContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
