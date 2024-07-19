import React from "react";
import Nav from "./Components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

const Layout: React.FC = () => {
    return (
        <div>
            <Nav />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
