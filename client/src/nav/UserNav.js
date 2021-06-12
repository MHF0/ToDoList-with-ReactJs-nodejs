import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/forgetPassword" className="nav-link">
                   Change Password
                </Link>
            </li>
        </ul>
    </nav>
);

export default AdminNav;
