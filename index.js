const express = require("express");
const app = express();
const http = require('http');

morgan = require('morgan');

let topTenMovies = [
    {
        title: '17 Again',
        director: 'Burr Steers',
        yearReleased: '2009',
    },
    {
        title: 'Coraline',
        director: 'Henry Selick',
        yearReleased: '2009',
    },
    {
        title: 'Us',
        director: 'Jordan Peele',
        yearReleased: '2019',
    },
    {
        title: 'Grown Ups',
        director: 'Dennis Dugan',
        yearReleased: '2010',
    },
    {
        title: 'Lilo and Stitch',
        director: '',
        yearReleased: '2009',
    },
    {
        title: 'Free Guy',
        director: 'Shawn Levy',
        yearReleased: '2021',
    },
    {
        title: 'The Green Mile',
        director: 'Frank Darabont',
        yearReleased: '1999',
    },
    {
        title: 'Lone Survivor',
        director: 'Peter Berg',
        yearReleased: '2013',
    },
    {
        title: 'The Conjuring',
        director: 'James Wan',
        yearReleased: '2013',
    },
    {
        title: 'The Curse of La Llorona',
        director: 'Michael Chaves',
        yearReleased: '2019',
    },
]

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
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