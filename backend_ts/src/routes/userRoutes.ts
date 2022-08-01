const express = require("express");
const router = express.Router();
import UserController from "../controllers/userControllers";

// Public Routes
router.post("/register", UserController.userRegistration);

//Protected Routes

export default router;
