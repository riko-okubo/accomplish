import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./style/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import { TaskContextProvider } from "./context/TaskContext";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        {/* <AuthProvider>
          <TaskContextProvider> */}
        <RouterProvider router={router} />
        {/* </TaskContextProvider>
        </AuthProvider> */}
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
