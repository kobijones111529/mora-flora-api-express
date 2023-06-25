import express from "express";
import cors from "cors";
import sessionMiddleware from "./modules/session-middleware.js";
import passport from "./strategies/user.strategy.js";
import userRouter from "./routes/user.router.js";
import postsRouter from "./routes/posts.router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/user", userRouter);
app.use("/posts", postsRouter);

export default app;
