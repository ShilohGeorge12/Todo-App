import joi from "joi";
import { Request } from "express";

function validateTodos(schema: Request ){
  const Schema = joi.object({
    todo: joi.string().min(2).max(30).required(),
    completed: joi.boolean()
  })
  return Schema.validate(schema, {abortEarly: false })
};

export default validateTodos;