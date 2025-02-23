// const { CreateRecipeSchema, GetRecipeSchema, GetUserRecipesSchema, JoinSchema } = require("../schema-validations/index");

// Middleware to validate request data
const validate = (schema) => async (req, res, next) => {
    console.log("Trying to validate");
    try {
        await schema.validate({
            ...(req?.body && { body: req.body }),
            ...(req?.query && { query: req.query }),
            ...(req?.params && { params: req.params }),
        });
        return next();
    } catch (err) {
        console.error({ error: err.message });
        res.status(400).json({ error: err.message });
    }
};

// module.exports = { validate };
export { validate };