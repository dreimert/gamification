import express from "express";
import { shuffleArraySeeded } from "../utils/shuffle.js";
import { getIntFromRange, getRandomBytes } from "../utils/random.js";
import fs from "fs";
import { userAgentMiddleware } from "../middleware/userAgent.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { checkSessionValidity } from "../middleware/sessionValidity.js";
import { checkProgressionValidity } from "../middleware/progressionValidity.js";
import { logger } from "../app.js";
import { toHexString } from "../utils/array.js";
import { generateISBN } from "../utils/isbn.js";
import { limiterLvl3 } from "../middleware/rateLimiter.js";

const scrappingRouter = express.Router();
const data_root = "src/app/tp_data/scrapping/";

// For all the routes, we need to authenticate the user first using a token
// scrappingRouter.use(authenticateToken);

// We need to render the different pages
scrappingRouter.get("/", (req, res) => {
    res.render("scrapping/home.njk");
});

// lvl 1

scrappingRouter.get(
    "/lvl1",
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(0),
    (req, res) => {
        const teachers = getDataFromFile("lvl1_data.json");
        shuffleArraySeeded(teachers, req.user.id);
        const index = getIntFromRange(0, teachers.length - 1, req.user.id + "teacher");
        const teacher = teachers[index];
        res.json({ teacherInitials: teacher.initials });
    },
);

// Contains in the body the username for a random teacher (based on the seed)
// Called from the Frontend
scrappingRouter.post(
    "/lvl1",
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(0),
    async (req, res) => {
        const teachers = getDataFromFile("lvl1_data.json");
        shuffleArraySeeded(teachers, req.user.id);
        const index = getIntFromRange(0, teachers.length - 1, req.user.id + "teacher");
        const trueTeacher = teachers[index];
        const username = req.body.username;
        if (!username) {
            res.status(400).json({ error: "no username" });
            return;
        }
        if (username === trueTeacher.username) {
            try {
                req.progression.level = 1;
                await req.progression.save();
            } catch (e) {
                logger.error(e);
                return res.status(500).json({ error: "internal error" });
            }
            res.json({ success: true, progress: 2 });
        } else {
            res.json({ success: false, error: "wrong username" });
        }
    },
);

scrappingRouter.get(
    "/lvl1/scrap",
    userAgentMiddleware,
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(0),
    (req, res) => {
        const teachers = getDataFromFile("lvl1_data.json");
        shuffleArraySeeded(teachers, req.user.id);
        res.render("scrapping/lvl1.njk", { teachers: teachers });
    },
);

// lvl 2

// Called from the Frontend
scrappingRouter.get("/lvl2", authenticateToken, (req, res) => {
    const trueCourse = getLvl2ObjectiveCourse(req.user.id, req.tpSession.id);
    res.json({ courseCode: trueCourse.code });
});

// Called from the Frontend
scrappingRouter.post(
    "/lvl2",
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(1),
    async (req, res) => {
        const trueCourse = getLvl2ObjectiveCourse(req.user.id, req.tpSession.id);
        const courseName = req.body.name;
        const courseHours = req.body.hours;
        const courseECTS = req.body.ects;
        if (!courseName || !courseHours || !courseECTS) {
            res.status(400).json({ error: "no course name or code or ects" });
            return;
        }
        if (courseName === trueCourse.name && courseHours === trueCourse.hours && courseECTS === trueCourse.ects) {
            req.progression.level = 2;
            try {
                await req.progression.save();
            } catch (e) {
                logger.error(e);
                return res.status(500).json({ error: "internal error" });
            }
            return res.json({ success: true, progress: 3 });
        } else {
            return res.json({ success: false, error: "incorrect informations" });
        }
    },
);

scrappingRouter.get(
    "/lvl2/scrap",
    userAgentMiddleware,
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(1),
    (req, res) => {
        const data = getDataFromFile("lvl2_data.json");
        // pick a random course in between the 3 years and different ue
        const years = data.years.map((year) => {
            // obfuscate the year name such that it is not obvious and can be deciphered later
            return obfuscateString(year.name, req.user.id + req.tpSession.id);
        });
        res.render("scrapping/lvl2_years.njk", { years: years });
    },
);

// Called from the scrapper
scrappingRouter.get(
    "/lvl2/scrap/:year",
    userAgentMiddleware,
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(1),
    (req, res) => {
        const data = getDataFromFile("lvl2_data.json");
        const year = deobfuscateString(req.params.year);
        const yearData = data.years.find((y) => y.name === year);
        if (!yearData) {
            res.status(404).json({ error: "year not found" });
            return;
        }
        const ues = yearData.ues.map((ue) => {
            // obfuscate the ue name such that it is not obvious and can be deciphered later
            return obfuscateString(ue.name, req.user.id + req.tpSession.id);
        });
        res.render("scrapping/lvl2_ues.njk", { ues: ues, year: req.params.year });
    },
);

scrappingRouter.get(
    "/lvl2/scrap/:year/:ue",
    userAgentMiddleware,
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(1),
    (req, res) => {
        const data = getDataFromFile("lvl2_data.json");
        const year = deobfuscateString(req.params.year);
        const ue = deobfuscateString(req.params.ue);
        const yearData = data.years.find((y) => y.name === year);
        if (!yearData) {
            res.status(404).json({ error: "year not found" });
            return;
        }
        const ueData = yearData.ues.find((u) => u.name === ue);
        if (!ueData) {
            res.status(404).json({ error: "ue not found" });
            return;
        }
        const courses = ueData.courses.map((course) => {
            // obfuscate the course name such that it is not obvious and can be deciphered later
            return obfuscateString(course.code, req.user.id + req.tpSession.id);
        });
        res.render("scrapping/lvl2_courses.njk", { courses: courses, year: req.params.year, ue: req.params.ue });
    },
);

scrappingRouter.get(
    "/lvl2/scrap/:year/:ue/:course",
    userAgentMiddleware,
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(1),
    (req, res) => {
        const data = getDataFromFile("lvl2_data.json");
        const year = deobfuscateString(req.params.year);
        const ue = deobfuscateString(req.params.ue);
        const course = deobfuscateString(req.params.course);
        const yearData = data.years.find((y) => y.name === year);
        if (!yearData) {
            res.status(404).json({ error: "year not found" });
            return;
        }
        const ueData = yearData.ues.find((u) => u.name === ue);
        if (!ueData) {
            res.status(404).json({ error: "ue not found" });
            return;
        }
        const courseData = ueData.courses.find((c) => c.code === course);
        if (!courseData) {
            res.status(404).json({ error: "course not found" });
            return;
        }
        res.render("scrapping/lvl2_course_details.njk", {
            course: courseData,
            year: req.params.year,
            ue: req.params.ue,
            courseName: req.params.course,
        });
    },
);

// lvl 3

const lvl3Middleware = [
    userAgentMiddleware,
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(2),
    limiterLvl3,
];

scrappingRouter.get(
    "/lvl3",
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(2),
    (req, res) => {
        res.json({});
    },
);

scrappingRouter.post(
    "/lvl3",
    authenticateToken,
    checkSessionValidity("scrapping"),
    checkProgressionValidity(2),
    async (req, res) => {
        const data = getDataFromFile("lvl3_data.json");
        const objectiveBook = getObjectiveBook(req, data);
        const bookTitle = req.body.title;
        const bookISBN = req.body.isbn;
        if (!bookTitle || !bookISBN) {
            res.status(400).json({ error: "Missing fields" });
            return;
        }
        if (bookTitle === objectiveBook.title && bookISBN === objectiveBook.isbn) {
            req.progression.level = 3;
            try {
                await req.progression.save();
            } catch (e) {
                logger.error(e);
                return res.status(500).json({ error: "internal error" });
            }
            return res.json({ success: true, progress: 4 });
        } else {
            return res.json({ success: false, error: "incorrect informations" });
        }
    },
);

scrappingRouter.get("/lvl3/scrap", lvl3Middleware, (req, res) => {
    const data = getDataFromFile("lvl3_data.json");
    generateISBN(data, req.user.id + req.tpSession.id);
    data.forEach((book) => {
        book.id = obfuscateString(book.isbn.toString(), req.user.id + req.tpSession.id);
    });
    shuffleArraySeeded(data, req.user.id + req.tpSession.id);
    res.render("scrapping/lvl3.njk", { books: data });
});

scrappingRouter.get("/lvl3/scrap/:id", lvl3Middleware, (req, res) => {
    const data = getDataFromFile("lvl3_data.json");
    generateISBN(data, req.user.id + req.tpSession.id);
    const id = deobfuscateString(req.params.id);
    const book = data.find((b) => b.isbn.toString() === id);
    if (!book) {
        res.status(404).json({ error: "book not found" });
        return;
    }
    res.render("scrapping/lvl3_book_details.njk", { book: book });
});

// Utils

function getDataFromFile(filePath) {
    const file = fs.readFileSync(data_root + filePath);
    return JSON.parse(file);
}

function getLvl2ObjectiveCourse(userId, sessionId) {
    const data = getDataFromFile("lvl2_data.json");
    const baseSeed = userId + sessionId;
    // pick a random course in between the 3 years and different ue
    const year = getIntFromRange(0, data.years.length - 1, baseSeed + "year");
    const ue = getIntFromRange(0, data.years[year].ues.length - 1, baseSeed + "ue");
    const course = getIntFromRange(0, data.years[year].ues[ue].courses.length - 1, baseSeed + "course");
    return data.years[year].ues[ue].courses[course];
}

function obfuscateString(string, seed) {
    const randBytes = getRandomBytes(8, seed + string);
    const s = toHexString(randBytes.slice(0, 4)) + " " + string + " " + toHexString(randBytes.slice(4, 8));
    return encodeURIComponent(
        btoa(
            s
                .split("")
                .map((c, i) => String.fromCharCode(c.charCodeAt(0) + s.length - i))
                .reverse()
                .join(""),
        ),
    );
}

function deobfuscateString(string) {
    const s = atob(decodeURIComponent(string));
    return s
        .split("")
        .reverse()
        .map((c, i) => String.fromCharCode(c.charCodeAt(0) - s.length + i))
        .join("")
        .split(" ")[1];
}

function getObjectiveBook(req, data) {
    const baseSeed = req.user.id + req.tpSession.id + "book";
    let min = Number.MAX_SAFE_INTEGER;
    let objectiveBook = null;
    generateISBN(data, baseSeed);
    data.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
    data.forEach((book) => {
        const isbnSum = sumISBN(book);
        if (isbnSum < min) {
            min = isbnSum;
            objectiveBook = book;
        }
    });
    return objectiveBook;
}

function sumISBN(book) {
    const isbn = book.isbn;
    return isbn
        .toString()
        .split("")
        .map((c) => parseInt(c))
        .reduce((a, b) => a + b, 0);
}

export default scrappingRouter;
