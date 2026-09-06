import { validationResult } from "express-validator";

export function validate(req, _res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const error = new Error("Validation failed");
  error.status = 422;
  error.errors = result.array();
  next(error);
}

