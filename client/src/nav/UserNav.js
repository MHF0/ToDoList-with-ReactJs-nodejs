import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
    <nav>
        <ul className="nav flex-column">

            <li className="nav-item">
                <Link to="/admin/sub" className="nav-link">
                    Complete taskes
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/forgetPassword" className="nav-link">
                   Change Password
                </Link>
            </li>
        </ul>
    </nav>
);

export default AdminNav;
