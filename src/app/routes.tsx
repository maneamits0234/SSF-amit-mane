import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "product/:id",
        Component: ProductDetail,
      },
    ],
  },
]);