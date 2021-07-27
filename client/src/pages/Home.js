import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createToDoList,
    getToDoLists,
    removeToDoList,
} from "../functions/toDoList";
import { addToComplete, removeFromHome } from "../functions/auth";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ToDoListForm from "../ToDoList/ToDoListForm";
import ToDoListSearch from "../ToDoList/ToDoListSearch";
import Header from '../nav/Header';
import { Link } from "react-router-dom";
import './Home.css'

const ToDoListCreate = (complete) => {

    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [toDoLists, setToDoLists] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadToDoList();
        // eslint-disable-next-line

    }, []);

    const loadToDoList = () =>
        getToDoLists(user.token).then((res) => setToDoLists(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createToDoList({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadToDoList();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };


    const handleRemove = async (slug) => {
        setLoading(true);
        removeToDoList(slug, user.token)
            .then((res) => {
                setLoading(false);
                toast.error(`${res.data.name} deleted`);
                loadToDoList();
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            });
    };

    const handleAddComplete = (toDoListId) => {
        // eslint-disable-next-line 
        // addToComplete(toDoListId, user.token).then((res) => {
        //     toast.success("Add to Complete"); 
        // });
        removeFromHome(toDoListId, user.token).then((res) => {
            loadToDoList();
        });
    };


    const searched = (keyword) => (t) => t.name.toLowerCase().includes(keyword);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-md-2" /> */}
                    <div className='container'>
                        <div className="col">
                            {loading ? (
                                <h4 className="text-danger">Loading..</h4>
                            ) : (
                                <h4 className='allTasks'>All Tasks</h4>
                            )}

                            <ToDoListForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                            />

                            {/* step 2 and step 3 */}
                            <ToDoListSearch keyword={keyword} setKeyword={setKeyword} />

                            {/* step 5 */}
                            {toDoLists.filter(searched(keyword)).map((t) => (
                                <div className='container'>
                                    <div className="alert alert-secondary" key={t._id}>
                                        <b>{t.name}</b>
                                        <span
                                            onClick={() => handleRemove(t.slug)}
                                            className="btn btn-sm float-right"
                                        >
                                            <DeleteOutlined className="text-danger" />
                                        </span>

                                        <span className="btn btn-sm float-right">
                                            <Link to={`/home/${t.slug}`}>
                                                <EditOutlined className="text-warning" />
                                            </Link>
                                        </span>
                                        <spa className="btn btn-sm float-right">
                                            <span onClick={() => handleAddComplete(t._id)}>
                                                <CheckCircleOutlined className="text-info" /> <br />
                                            </span>
                                        </spa>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToDoListCreate;
