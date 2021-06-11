import React from "react";
import './nav.css'
const Footer = () => {

    return (
        <footer className="nav-color text-center text-white footer">
            <div className="text-center p-3" style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2021 Copyright:
                <a className="text-white" href="/"> ToDoList</a>
            </div>
        </footer>
    );
};

export default Footer;
