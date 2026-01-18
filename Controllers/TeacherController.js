export async function addingTeacher(req, res, db) {
    console.log(req.body);
    const { Name, Surname, Edu, Stream, Comm, Add, Adno, Ref, Mob, Date, Age, Gender } = req.body;

    try {
        await db.execute(
            `INSERT INTO TEACHER_ENTRY
       (Name, Surname, Education, Stream, Comm, Address, Adno, Reference, Mobile_number, Joining_Date, Age, Gender)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,  // ✅ 12 placeholders
            [Name, Surname, Edu, Stream, Comm, Add, Adno, Ref, Mob, Date, Age, Gender] // 12 values
        );

        res.json({ message: "Teacher added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database Error" });
    }
}

export async function updateData(req, res, db) {
    console.log(req.body);
    const { Name, Surname, Edu, Stream, Comm, Add, Adno, Ref, Mob, Date, Age, Gender, teacherId } = req.body;
    const sqlQuery = `UPDATE TEACHER_ENTRY SET Name = ?, Surname = ?, Education = ?, Stream = ?, Comm = ?, Address = ?, Adno = ?, Reference = ?, Mobile_number = ?, Joining_Date = ?, Age = ?, Gender = ? WHERE Id = ?;
    `
    try {
        await db.execute(sqlQuery, [Name, Surname, Edu, Stream, Comm, Add, Adno, Ref, Mob, Date, Age, Gender, teacherId]);

        res.json({ message: "Teacher Data Updated SuccessFully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database Error" });
    }
}

export async function getData(req, res, db) {
    try {
        const [rows] = await db.execute("SELECT * FROM TEACHER_ENTRY");
        res.json(rows);
    } catch (error) {
        console.log(error.msg)
        console.log(error.status)
        res.status((500).json({ error: "Database Error" }));
    }
}

export async function deletingTeacherData(req, res, db) {
    const { id } = req.body || {};
    console.log("Type of id:", typeof id, "Value:", id);

    if (!id) {
        return res.status(400).json({ error: "Missing id" });
    }

    try {
        const [result] = await db.execute(
            "DELETE FROM TEACHER_ENTRY WHERE Id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Database Error" });
    }
}