import express, { Express, Request, Response } from "express";
import cors from "cors";

import { router as CrudRouter } from "./routes/dev-routes/crud.router";
import ErrorController from "./controllers/ErrorController";

const errorController = new ErrorController();

const app: Express = express();

app.use(cors({
    origin: 'http://example.com',                                       // Allow only requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',                          //
    credentials: true,                                                  // Enable credentials (e.g., cookies)
    optionsSuccessStatus: 204,                                          // Respond with a 204 status for preflight requests
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/dev", CrudRouter);

// Global Error Handling
app.use(errorController.globalErrorHandler.bind(errorController));

app.use("*", (req, res) => {
    res.status(404).send("NOT FOUND!!");
});

export default app;