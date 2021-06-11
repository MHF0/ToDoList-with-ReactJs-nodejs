import React, { useState } from "react";
import { Menu } from "antd";
import {
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import './en.css'

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/");
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode='vertical' className='nav-color navBar'>

            {!user && (
                <Item
                    key="login"
                    className="nav-text-icon float-left hover userName"
                    style={{ width: '150px' }} icon={<UserOutlined />}>
                    <Link to="/login"><b className="nav-text-icon">Login</b></Link>
                </Item>
            )}
            {user && (
                <SubMenu
                    title={user.name && user.name}
                    className="nav-text-icon float-left hover navPostion userName"
                >
                    <Item>
                        <Link to="/forgetPassword">Change Password</Link>
                    </Item>

                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
          </Item>
                </SubMenu>
            )}
        </Menu>
    );
};

export default Header;
