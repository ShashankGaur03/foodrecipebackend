// const { Router } = require("express");
// const { RegisterOrLogin } = require("../controllers/index");
// const { validate } = require("../middlewares/index");
// const { JoinSchema } = require("../schema-validations/index");

import { Router } from "express";
import { RegisterOrLogin } from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import { JoinSchema } from "../schema-validations/index.js";

const router = Router();
router.post("/join", validate(JoinSchema), RegisterOrLogin);

// module.exports = router;
export { router };