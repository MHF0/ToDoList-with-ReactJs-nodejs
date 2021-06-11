import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getToDoList, updateToDoList } from "../functions/toDoList";
import ToDoListForm from "../ToDoList/ToDoListForm";
import Header from '../nav/Header';

const ToDoListUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadToDoList();
        // eslint-disable-next-line
    }, []);

    const loadToDoList = () =>
        getToDoList(match.params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateToDoList(match.params.slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="container">
                    
                    <div className="col">
                        {loading ? (
                            <h4 className="text-danger">Loading..</h4>
                        ) : (
                            <h4>Update ToDoList</h4>
                        )}

                        <ToDoListForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />
                        <hr />
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToDoListUpdate;
