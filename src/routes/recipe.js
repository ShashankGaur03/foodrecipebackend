// const { Router } = require("express");
// const passport = require("passport");
// const { validate } = require("../middlewares/validate");
// const { 
//     CreateRecipeSchema, 
//     GetRecipeSchema, 
//     GetUserRecipesSchema, 
//     SearchRecipeSchema 
// } = require("../schema-validations/index");

// const { 
//     SearchRecipe, 
//     GetRecipe, 
//     GetAllRecipes, 
//     GetUserRecipes, 
//     CreateRecipe 
// } = require("../controllers/index");

import { Router } from "express";
import passport from "passport";
import { validate } from "../middlewares/index.js";
import { CreateRecipeSchema, GetRecipeSchema, GetUserRecipesSchema, SearchRecipeSchema } from "../schema-validations/index.js";
import { SearchRecipe, GetRecipe, GetAllRecipes, GetUserRecipes, CreateRecipe } from "../controllers/index.js";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), GetAllRecipes);
router.get("/find", passport.authenticate("jwt", { session: false }), validate(SearchRecipeSchema), SearchRecipe);
router.post("/create", passport.authenticate("jwt", { session: false }), validate(CreateRecipeSchema), CreateRecipe);
router.get("/user/:userId", passport.authenticate("jwt", { session: false }), validate(GetUserRecipesSchema), GetUserRecipes);
router.get("/:id", passport.authenticate("jwt", { session: false }), GetRecipe);

// module.exports = router;
export { router };