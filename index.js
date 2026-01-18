import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import path from "path";

const db = await mysql.createConnection({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "TS",
    port: process.env.MYSQLPORT || 3306
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reactBuildPath = path.join(__dirname, "view", "build");

app.use(express.static(reactBuildPath));

// Your API routes (unchanged)
app.get("/login", (req, res) => Login(req, res, db));
app.get("/teachers", (req, res) => getData(req, res, db));
// ... all your routes stay SAME

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(reactBuildPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Started at port ${PORT}`);
});


// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import path from "path";
// // ES modules
// import { addingTeacher, updateData, getData, deletingTeacherData } from "./Controllers/TeacherController.js";
// import { StudentData, getStudentData, updateStudentData, deletingStudentData } from "./Controllers/StudentController.js";
// import { Login } from "./Controllers/Login.js";


// import { fileURLToPath } from "url";

// const db = await mysql.createConnection({
//     host: process.env.MYSQLHOST || "localhost",
//     user: process.env.MYSQLUSER || "root",
//     password: process.env.MYSQLPASSWORD || "",
//     database: process.env.MYSQLDATABASE || "TS",
//     port: process.env.MYSQLPORT || 3306
// });


// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());                 // parse application/json
// app.use(express.urlencoded({ extended: true })); // optional, for form data

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const reactBuildPath = path.join(__dirname, "view", "build");

// app.use(express.static(reactBuildPath));

// app.get("/login", (req, res) => Login(req, res, db))

// app.get("/teachers", (req, res) => getData(req, res, db));

// app.post("/teacherData", (req, res) => addingTeacher(req, res, db));

// app.post("/updateData", (req, res) => updateData(req, res, db));

// app.post("/deletingTeacherData", (req, res) => deletingTeacherData(req, res, db));

// app.get("/StudentData", (req, res) => getStudentData(req, res, db));

// app.post("/StudentData", (req, res) => StudentData(req, res, db));

// app.post("/updateStudentData", (req, res) => updateStudentData(req, res, db));

// app.post("/deletingStudentData", (req, res) => deletingStudentData(req, res, db));

// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(reactBuildPath, "index.html"));
// });

// app.listen(PORT, () => {
//     console.log(`Started at http://localhost:${PORT}`);
// });