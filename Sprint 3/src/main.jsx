import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./pages/Error/error-page";
import Contact from "./routes/contacts";
import About from "./pages/About/about"; 
import Services from "./pages/Services/Services"; 
import Upload from "/Users/yashjani/Documents/Code/Shp1/SmartHirePro1/src/pages/Upload/Upload.jsx";

import Login from "/Users/yashjani/Documents/Code/Shp1/SmartHirePro1/src/pages/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/", // Root route
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId", 
        element: <Contact />,
      },
      {
        path: "about", 
        element: <About />,
      },
      {
        path: "services", 
        element: <Services />,
      },
      
      {
        path: "Upload", 
        element: <Upload/>,
      },
      {
        path: "Login", 
        element: <Login/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
