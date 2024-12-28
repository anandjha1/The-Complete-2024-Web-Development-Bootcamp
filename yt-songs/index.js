import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "https://openwhyd.org/adrien?format=json";

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        console.log(result.data[0].src);
        res.render('index.ejs', { contents: result.data });
    } catch (error) {
        console.log(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`server start at port ${port}`);
});