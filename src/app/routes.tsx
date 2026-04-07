import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { AboutUs } from "./pages/AboutUs";
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
        path: "about",
        Component: AboutUs,
      },
      {
        path: "product/:id",
        Component: ProductDetail,
      },
    ],
  },
]);