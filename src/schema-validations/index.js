// const yup = require("yup");

import yup from "yup";

// Schema for creating recipe
const CreateRecipeSchema = yup.object({
    body: yup.object({
        title: yup.string().required("Title is required"),
        note: yup.string(),
        ingredients: yup.string().required("Ingredients are required"),
        description: yup.string().required("Description is required"),
    }),
});

// Schema for fetching a recipe
const GetRecipeSchema = yup.object({
    query: yup.object({
        q: yup.string().required("Invalid request for getting recipe"),
    }),
});

// Schema for searching recipes
const SearchRecipeSchema = yup.object({
    query: yup.object({
        q: yup.string().required("Invalid request"),
    }),
});

// Schema for getting all recipes of the user
const GetUserRecipesSchema = yup.object({
    params: yup.object({
        userId: yup.string().min(24).required("Invalid request"),
    }),
});

// Register or login schema
const JoinSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required("Email is required."),
        password: yup
            .string()
            .min(7, "Password length must be greater than 6.")
            .required("Password is required."),
    }),
});

// module.exports = {
//     JoinSchema,
//     CreateRecipeSchema,
//     GetRecipeSchema,
//     SearchRecipeSchema,
//     GetUserRecipesSchema,
// };
export { JoinSchema, CreateRecipeSchema, GetRecipeSchema, SearchRecipeSchema, GetUserRecipesSchema };