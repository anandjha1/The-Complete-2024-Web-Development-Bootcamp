import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "anandjha";
const yourPassword = "12345";
const yourAPIKey = "5e5d952d-11e9-4c82-92f9-af3acc082b1f";
const yourBearerToken = "6cd2d671-20a5-4ffa-a8ec-d2f36bcd6418";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  const result = await axios.get(API_URL + 'random');
  res.render('index.ejs', { content: JSON.stringify(result.data) });
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  const result = await axios.get(API_URL + 'all', {
    auth: {
      username: yourUsername,
      password: yourPassword
    }
  })
  res.render('index.ejs', { content: JSON.stringify(result.data) })
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const result = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);

  res.render('index.ejs', { content: JSON.stringify(result.data) });
});

app.get("/bearerToken", async (req, res) => {

  const result = await axios.get(API_URL + 'secrets/42', {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    },
  });

  res.render('index.ejs', { content: JSON.stringify(result.data) })
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
