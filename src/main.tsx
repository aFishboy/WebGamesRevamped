import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import NotFoundPage from "./Components/NotFoundPage.tsx";
import Layout from "./Layout.tsx";
import About from "./Components/About.tsx";
import Game2048 from "./Components/2048/Game2048.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="2048" element={<Game2048 />} />
                <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    //<React.StrictMode>
        <RouterProvider router={router} />
   // </React.StrictMode>
);
