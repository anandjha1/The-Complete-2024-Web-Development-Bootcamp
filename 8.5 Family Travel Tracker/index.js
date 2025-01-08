import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password1",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1 ", [currentUserId]);
  let countries = [];

  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(countries);
  return countries;
}
async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  users = await getUsers();
  const color = users.find(user => user.id === currentUserId).color;
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if (req.body["add"] === 'new') {
    return res.render('new.ejs');
  }

  currentUserId = parseInt(req.body["user"]);
  res.redirect("/");
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const user_name = req.body["name"];
  const color = req.body["color"];

  try {
    const result = await db.query('INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;', [user_name, color]);
    console.log(result.rows);
    currentUserId = result.rows[0].id
    res.redirect("/");
  } catch (e) {
    console.error('error in adding user : ' + e);
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
