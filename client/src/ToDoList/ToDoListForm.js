import React from "react";

const ToDoListForm = ({ handleSubmit, name, setName }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group container">
            <input
                type="text"
                className="form-control"
                placeholder="Write here"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
            />
            <br />
            <button className="btn btn-outline-primary">Save</button>
        </div>
    </form>
);

export default ToDoListForm;
