import React, { useState, useEffect } from "react";
import { getComplete, removeComplete } from "../functions/auth";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import Header from '../nav/Header'

const Complete = () => {
    const [complete, setComplete] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadComplete();
        // eslint-disable-next-line
    }, []);

    const loadComplete = () =>
        getComplete(user.token).then((res) => {
            setComplete(res.data.complete);
        });

    const handleRemove = (completId) =>
        removeComplete(completId, user.token).then((res) => {
            loadComplete();
        });

    return (
        <>
            <Header />
            <div className="container">

                <div className="row">
                    <div className="">
                    </div>
                    <div className="col mt-4">
                        <h4>Completed</h4>

                        {complete.map((c) => (
                            <div key={c._id} className="alert alert-secondary" >
                                {c.name}
                                <span
                                    onClick={() => handleRemove(c._id)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger float-right" />
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Complete;
