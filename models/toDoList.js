const mongoose = require("mongoose");

const toDoListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ToDoList", toDoListSchema);