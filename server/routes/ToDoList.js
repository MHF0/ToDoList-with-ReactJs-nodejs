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

router.post("/", authCheck, create);
router.get("/", list);
router.get("/:slug", read);
router.put("/:slug", authCheck, update);
router.delete("/:slug", authCheck, remove);

module.exports = router;
