import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  password: 'password1',
  database: 'permalist',
  host: 'localhost',
  port: '5432'
});



let items = [];

db.connect();

async function getTodoItems() {
  const result = await db.query('SELECT * FROM items');
  return result.rows;
}

async function setTodoItems(title) {
  const result = await db.query('INSERT INTO items(title) VALUES ($1)', [title]);
  return result.rows;
}

async function updateTodoItems(id, title) {
  const result = await db.query('UPDATE items SET title = $1 WHERE id = $2', [title, id]);
  return result.rows;
}

async function deleteTodoItems(id) {
  const result = await db.query('DELETE FROM items WHERE id = $1', [id]);
  return result.rows;
}


app.get("/", async (req, res) => {
  items = await getTodoItems();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await setTodoItems(item);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const { updatedItemTitle, updatedItemId } = req.body;
  await updateTodoItems(updatedItemId, updatedItemTitle);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const { deleteItemId } = req.body;
  await deleteTodoItems(deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
