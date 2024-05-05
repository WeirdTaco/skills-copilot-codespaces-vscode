// Create web server
const express = require('express');
const app = express();
app.use(express.json());

// Create comments array
const comments = [
    { id: 1, username: 'Alice', comment: 'Hi there!' },
    { id: 2, username: 'Bob', comment: 'Hello!' },
    { id: 3, username: 'Charlie', comment: 'Good day!' }
];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('Comment not found');
    res.json(comment);
});

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        username: req.body.username,
        comment: req.body.comment
    };
    comments.push(comment);
    res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('Comment not found');
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('Comment not found');
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

// Listen to a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
