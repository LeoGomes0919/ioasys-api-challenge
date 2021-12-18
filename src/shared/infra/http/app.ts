import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes/index.routes";
import { AppError } from "../../errors/AppError";
import "../typeorm";

const app = express();
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    error: 'error',
    message: 'Internal Server error',
    error_message: err.message
  });
});

export { app };
