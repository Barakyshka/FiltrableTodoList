import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import FilterableTodo from "./FilterableTodo";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FilterableTodo />
  </StrictMode>
);
