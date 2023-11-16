import * as Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    todos: Joi.array()
});

export const createTodoSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(1000),
    completed: Joi.boolean(),
    username: Joi.string().min(5).required()
});