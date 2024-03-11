import express, { Express, Request, Response } from "express";
import cors from "cors";

import userRouter from "./routes/user.router";
import { globalErrorHandler } from "./controllers/error.controller";

const app: Express = express();

app.use(cors({
    origin: 'http://example.com', // Allow only requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (e.g., cookies)
    optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/users", userRouter);


// Global Error Handling
app.use(globalErrorHandler);

export default app;