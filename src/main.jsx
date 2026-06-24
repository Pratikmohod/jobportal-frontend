import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route";
import "./global.css";
import { Provider } from "react-redux";
import store from "./store/Store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Route}>
      <App />
    </RouterProvider>,
    
  </Provider>,
);
