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
import './nav.css'

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
        <Menu onClick={handleClick} selectedKeys={[current]} mode='vertical' className='nav-color h-45'>
            <div className='text-header'>
                <h3>
                    <b>ToDoList</b>

                </h3>
            </div>
            {!user && (
                <Item
                    key="login"
                    className="userName float-left"
                    style={{ width: '150px' }} icon={<UserOutlined />}>
                    <Link to="/"><b className="login">Login</b></Link>
                </Item>
            )}
            {user && (
                <SubMenu
                    title={`Hello, ${user.name && user.name}`}
                    className="float-left userName"
                >
                    <Item>
                        <Link to="/forgetPassword">Change Password</Link>
                    </Item>

                    <Item icon={<LogoutOutlined style={{ color: 'white', fontSize: '20px' }} />} onClick={logout}>
                        Logout
                    </Item>
                </SubMenu>
            )}
            {user && (
                <div>
                    <Item icon={<LogoutOutlined />} onClick={logout} className='float-right logout'>
                        Logout
                    </Item>
                </div>
            )}
        </Menu>
    );
};

export default Header;
