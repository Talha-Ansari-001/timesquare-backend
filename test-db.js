// test-db.js
import { createConnection } from 'mysql2/promise';

async function testConnection() {
    // test-db.js - UPDATE THESE VALUES
    const config = {
        host: 'maglev.proxy.rlwy.net',        // ✅ NEW PROXY HOST
        port: 17152,                          // ✅ NEW PROXY PORT (NOT 3306)
        user: 'root',
        password: 'miEpEDydCZFepmGDUEYRGMNGfokoqRSf',
        database: 'railway'
    };


    try {
        console.log('🔄 Testing Railway DB connection...');
        const connection = await createConnection(config);
        console.log('✅ CONNECTION SUCCESS!');
        console.log('Your DB is publicly accessible from anywhere!');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.log('❌ CONNECTION FAILED:');
        console.log('Error:', error.code, error.message);
        console.log('\n💡 MOST LIKELY: Railway DB needs Public Networking enabled');
        process.exit(1);
    }
}

testConnection();
