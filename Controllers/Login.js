export async function Login(req, res, db) {
    try { 
        const [rows] = await db.execute("SELECT * FROM LOGIN")
        res.json(rows)
    }
    catch (error) {
        res.send("Error " + error);
    }
} 