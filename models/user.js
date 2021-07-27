const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            index: true,
        },
        complete: [{ type: ObjectId, ref: "ToDoList" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);