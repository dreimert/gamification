import express from "express";
import userRouter from "./user.js";
import sessionRouter from "./session.js";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.json({
        api: "v1",
        version: "0.0.0",
    });
});

mainRouter.use("/user", userRouter);
mainRouter.use("/session", sessionRouter);

export default mainRouter;
