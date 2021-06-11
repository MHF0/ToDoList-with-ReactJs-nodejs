import React from "react";

const ToDoListSerach = ({ keyword, setKeyword }) => {
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <div className='container'>
            <input
                type="search"
                placeholder="Filter"
                value={keyword}
                onChange={handleSearchChange}
                className="form-control mb-4"
            />
        </div>
    );
};

export default ToDoListSerach;
