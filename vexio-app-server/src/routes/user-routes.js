import express from "express";
import { validate } from "express-validation";

import { login, register } from "../controllers/user";
import { userValidations } from "../validations/user";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.post(
  "/signup",
  validate(userValidations.createUserValidator),
  register
);

router.post("/login", login);

module.exports = router;
