const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const {
    create,
    read,
    update,
    remove,
    list,
} = require("../controllers/toDoList");

router.post("/toDoList", authCheck, create);
router.get("/toDoList", list);
router.get("/toDoList/:slug", read);
router.put("/toDoList/:slug", authCheck, update);
router.delete("/toDoList/:slug", authCheck, remove);

module.exports = router;
