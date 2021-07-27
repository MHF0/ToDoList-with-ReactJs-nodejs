const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const {
    createOrUpdateUser,
    currentUser,
    addComplete,
    complete,
    removeFromComplete,
    removeFromHome
} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

router.post("/complete", authCheck, addComplete);
router.get("/completed", authCheck, complete);
router.put("/complete/:toDoListId", authCheck, removeFromComplete);

router.put("/remove/:toDoListId", authCheck, removeFromHome);


module.exports = router;