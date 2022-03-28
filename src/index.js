import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ShopProvider from "./context/shopContext";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
