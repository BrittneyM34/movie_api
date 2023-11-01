const express = require("express");
const app = express();
const http = require('http');

morgan = require('morgan');

let movies = [
    {
        title: '17 Again',
        director: 'Burr Steers',
        genre: 'Comedy',
        featured: 'Yes',
    },
    {
        title: 'Coraline',
        director: 'Henry Selick',
        genre: 'Animation',
        featured: 'Yes',
    },
    {
        title: 'Us',
        director: 'Jordan Peele',
        genre: 'Horror',
        featured: 'Yes',
    },
    {
        title: 'Grown Ups',
        director: 'Dennis Dugan',
        genre: 'Comedy',
        featured: 'Yes',
    },
    {
        title: 'Lilo and Stitch',
        director: 'Chris Sanders',
        genre: 'Animation',
        featured: 'Yes',
    },
    {
        title: 'Free Guy',
        director: 'Shawn Levy',
        genre: 'Comedy',
        featured: 'Yes',
    },
    {
        title: 'The Green Mile',
        director: 'Frank Darabont',
        genre: 'Drama',
        featured: 'Yes',
    },
    {
        title: 'Lone Survivor',
        director: 'Peter Berg',
        genre: 'Action',
        featured: 'Yes',
    },
    {
        title: 'The Conjuring',
        director: 'James Wan',
        genre: 'Horror',
        featured: 'Yes',
    },
    {
        title: 'The Curse of La Llorona',
        director: 'Michael Chaves',
        genre: 'Horror',
        featured: 'Yes',
    },
]

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my Movie Flix')
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('The movie app has loaded and is listening on port 8080');
});

//Return a list of all movies
app.get('/movies', (req, res) => {
    movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Return data about a single movie by title
app.get('/movies:/Title', (req, res) =>{
    movies.findOne({Title: req.params.Title})
    .then((movie) => {
        resstatues(200).json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.statusMessage(500).send('Error ' + err);
    });
});

//Return data about a genre description by name

