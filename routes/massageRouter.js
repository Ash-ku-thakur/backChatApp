import express from "express";
import {
  CreateMassage,
  GetAllMassages,
} from "../controllers/massageController.js";
import { IsAuth } from "../midelware/isAuthenticated.js";

let router = express.Router();

router.route("/create/:id").post(IsAuth, CreateMassage);
router.route("/allMassages").post(IsAuth, GetAllMassages);

export default router;
