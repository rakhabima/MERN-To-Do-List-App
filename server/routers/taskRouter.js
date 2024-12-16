const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.post("/add", taskController.create);
router.get("/", taskController.findAll);
router.get("/:id", taskController.findOne);
router.put("/update/:id", taskController.update); 

module.exports = router;