const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, addToComplete, complete, removeFromComplete } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

// complete
router.get("/home/complete", authCheck, complete);
router.post("/home/complete", authCheck, addToComplete);
router.put("/home/complete/:toDoListId", authCheck, removeFromComplete);

module.exports = router;