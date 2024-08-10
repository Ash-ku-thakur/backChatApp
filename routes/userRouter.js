import express from "express";
import {
  GetotherUsers,
  Login,
  Logout,
  Register,
} from "../controllers/userController.js";
import { IsAuth } from "../midelware/isAuthenticated.js";

let router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/otheruser").get(IsAuth, GetotherUsers);

export default router;
