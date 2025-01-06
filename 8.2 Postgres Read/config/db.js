import pg from 'pg';

const { Client } = pg;

const client = new Client({
    user: 'postgres',
    password: 'password1',
    host: 'localhost',
    port: '5432',
    database: 'world'
});

await client.connect();

client.on('error', (err) => {
    console.error('Database connection error.. : ' + err.stack);
});

// const res = await client.query('SELECT NOW()');

// console.log(res.rowCount);

// await client.end();
export default client;