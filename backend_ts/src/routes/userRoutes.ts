const express = require("express");
const router = express.Router();
import UserController from "../controllers/userControllers";

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.loginUser);
router.get("/profile/:email",UserController.getUserProfile);
//Protected Routes

export default router;
