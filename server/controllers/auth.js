const User = require("../models/user");
const ToDoList = require("../models/toDoList");

exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        { name: email.split("@")[0], picture },
        { new: true }
    );
    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name: email.split("@")[0],
            picture,
        }).save();
        res.json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if (err) throw new Error(err);
        res.json(user);
    });
};

// addToComplete complete removeFromComplete
exports.addToComplete = async (req, res) => {
    // const { toDoListId } = req.body;
    const toDoList = await ToDoList.findOne(req.params.toDoListId);

    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { complete: toDoList } }
    ).exec();
    res.json({ ok: true });
};

exports.complete = async (req, res) => {
    const list = await User.findOne({ email: req.user.email })
        .select("complete")
        .populate("complete")
        .exec();

    res.json(list);
};

exports.removeFromComplete = async (req, res) => {
    const toDoList = await ToDoList.findOne(req.params.toDoListId);

    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $pull: { complete: toDoList } }
    ).exec();

    res.json({ ok: true });
};