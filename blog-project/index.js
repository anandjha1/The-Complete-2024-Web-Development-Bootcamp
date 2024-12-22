import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

const posts = [{ id: 1, title: 'Sample Post one', content: 'hello this is post content.' }];

app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});
app.get('/create', (req, res) => {
    res.render('create.ejs', { posts });
});

app.post('/create/:id', (req, res) => {
    const id = req.params?.id
    if (id) {
        let index = posts.findIndex(post => post.id === id);

        posts[index] = { id, ...req.body };
    }
    posts.push({
        id: posts.length + 1,
        ...req.body
    })
    res.redirect('/');
});

app.put('/update/:id', (req, res) => {

    const post = posts.find(post => post.id === req.params.id);
    res.redirect('/create', { post });
});

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});