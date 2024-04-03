// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.post("/register", userController.registerUser);
router.post("/login-user", userController.loginUser);
router.post("/userdata", userController.getUserData);
router.post("/update-user", userController.updateUser);
router.get("/get-all-user", userController.getAllUsers);
router.delete("/delete-user/:id", userController.deleteUser);
router.post("/add-salary-slip", userController.addSalarySlip);
router.post("/get-salary-slips-by-email", userController.getSalarySlipsByEmail); // New route for fetching salary slips by email
router.get("/get-all-salary-slip", userController.getAllSalarySlip)
router.delete("/delete-salary-slip/:id", userController.deleteSalrySlip)


module.exports = router;
