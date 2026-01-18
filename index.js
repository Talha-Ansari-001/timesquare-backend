import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || 'maglev.proxy.rlwy.net',
    port: parseInt(process.env.MYSQLPORT) || 17152,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'miEpEDydCZFepmGDUEYRGMNGfokoqRSf',
    database: process.env.MYSQLDATABASE || 'railway',
    connectionLimit: 10,
    connectTimeout: 30000,
    ssl: { rejectUnauthorized: false }
});

import { Login } from "./Controllers/Login.js";
import { getData, addingTeacher, updateData, deletingTeacherData } from "./Controllers/TeacherController.js";
import { getStudentData, StudentData, updateStudentData, deletingStudentData } from "./Controllers/StudentController.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.json({ status: 'OK', db: 'connected', message: 'Times Square Backend LIVE! 🚀' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', db: 'disconnected' });
    }
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Times Square Academy Backend API ✅',
        endpoints: ['/health', '/login', '/teachers', '/StudentData', '/teacherData (POST)'],
        status: 'production'
    });
});

// ALL API ROUTES FIRST
app.get("/login", (req, res) => Login(req, res, pool));
app.get("/teachers", (req, res) => getData(req, res, pool));
app.post("/teacherData", (req, res) => addingTeacher(req, res, pool));
app.post("/updateData", (req, res) => updateData(req, res, pool));
app.post("/deletingTeacherData", (req, res) => deletingTeacherData(req, res, pool));
app.get("/StudentData", (req, res) => getStudentData(req, res, pool));
app.post("/StudentData", (req, res) => StudentData(req, res, pool));
app.post("/updateStudentData", (req, res) => updateStudentData(req, res, pool));
app.post("/deletingStudentData", (req, res) => deletingStudentData(req, res, pool));

// Serve React static files
const reactBuildPath = path.join(__dirname, "view", "build");
app.use(express.static(reactBuildPath));

// 🔥 FIXED CATCH-ALL - WORKS IN EXPRESS 5 (Replace line 68)

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'build', 'index.html'));
});

app.listen(PORT, async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Connected Successfully!');
        connection.release();
        console.log(`🚀 Server running on port ${PORT}`);
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
    }
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