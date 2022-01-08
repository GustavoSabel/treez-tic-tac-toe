import 'reflect-metadata';
import createError from 'http-errors';
import {Application, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import {createConnection} from 'typeorm';

/**
 * Tic-Tac-Toe Service
 *
 * @author TopherThomas
 */

/**
 * Server function.
 */
export const createServer = () => {
  // Load any Env vars
  dotenv.config();

  // Set port for service
  const port = process.env.SERVER_PORT || 3001;

  const express = require('express');

  const indexRouter = require('./routes/index.route');

  const app: Application = express();

  // Setup Middleware
  app.use(express.json());

  app.use('/', indexRouter);

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  // error interface to allow for type checking
  interface Error {
    message?: string;
    status?: number;
  }

  // error handler
  app.use((err: Error, req: Request, res: Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });

  app.listen(port, () => {
    console.debug(`Hello World app started on port ${port}`);
  });
};

/**
 * Create connection to Database.
 * Then start Server.
 */
console.log('Creating connection...');
try {
  createConnection();
  console.log('Conneciton created.');
  createServer();
} catch (error) {
  console.log('Error creating connection.');
  console.log(error);
}
