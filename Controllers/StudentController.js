

export async function StudentData(req, res, db) {
    console.log(req.body);
    const {
        Name,
        Surname,
        Edu,       // goes into Current_Edu
        Course,
        Add,
        Adno,      // goes into Aadhaar_Number
        Ref,
        Mob,
        BirthDate,
        Age,
        Gender
    } = req.body;

    try {
        await db.execute(
            `INSERT INTO STUDENT_ENTRY
       (Name, Surname, Current_Edu, Address, Aadhaar_Number,
        Age, Reference, Mobile_Number, Date_Of_Birth, Course, Gender)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Name, Surname, Edu, Add, Adno, Age, Ref, Mob, BirthDate, Course, Gender]
        );

        res.json({ message: "Student added successfully" });
    } catch (error) {
        console.error("StudentData error:", error);
        res.status(500).json({ error: "Database Error" });
    }
}

export async function getStudentData(req, res, db) {
    try {
        const [rows] = await db.execute("SELECT * FROM STUDENT_ENTRY");
        res.json(rows);
    } catch (error) {
        console.log(error.msg)
        console.log(error.status)
        res.status((500).json({ error: "Database Error" }));
    }
}


export async function updateStudentData(req, res, db) {
    console.log(req.body);
    const {
        Name,
        Surname,
        Edu,       // goes into Current_Edu
        Course,
        Add,
        Adno,      // goes into Aadhaar_Number
        Ref,
        Mob,
        BirthDate,
        Age,
        Gender,
        studentId
    } = req.body;
    const sqlQuery = `UPDATE STUDENT_ENTRY SET Name = ?, Surname = ?, Current_Edu = ?, Address = ?, Aadhaar_Number = ?, Age = ?, Reference = ?, Mobile_Number = ?, Date_Of_Birth = ?, 
    Course = ?, Gender = ? WHERE Id = ?;
    `

    try {
        await db.execute(sqlQuery, [Name, Surname, Edu, Add, Adno, Age, Ref, Mob, BirthDate, Course, Gender, studentId]);
        res.json({ message: "Teacher Data Updated SuccessFully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database Error" });
    }
}


export async function deletingStudentData(req, res, db) {
    const { id } = req.body || {};
    console.log("Type of id:", typeof id, "Value:", id);

    if (!id) {
        return res.status(400).json({ error: "Missing id" });
    }

    try {
        const [result] = await db.execute(
            "DELETE FROM STUDENT_ENTRY WHERE Id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Database Error" });
    }
}