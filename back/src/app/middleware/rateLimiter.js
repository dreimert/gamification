import rateLimit from "express-rate-limit";

export const limiterLvl3 = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // limit each IP to 5 requests per windowMs
    standardHeaders: "draft-07",
    legacyHeaders: false,
});
