import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  password: 'password1',
  host: 'localhost',
  port: '5432',
  database: 'world'
});

await db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  const result = await db.query('SELECT country FROM visited_countries');
  countries = result.rows.map(row => row.country);
  res.render('index.ejs', { countries: countries, total: countries.length });
});

app.post('/add', async (req, res) => {
  const { country } = req.body;
  const country_code = (await db.query(`SELECT country_code FROM countries where country_name = '${country}'`)).rows[0]?.country_code;
  console.log(country_code);
  const result = await db.query(`INSERT INTO visited_countries(country) values('${country_code}')`);
  // 
  if (result.rowCount > 0) {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
