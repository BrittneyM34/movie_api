const express = require("express");
    app = express();
    http = require('http');
    uuid = require('uuid');

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
    res.statues(200).json(movies);
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
        res.status(200).json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

//Return data about a genre description by name
app.get('/movies:/genre:/genreName', (req, res) => {
    movies.findOne({'Genre.Name': req.params.genreName})
    .then((movie) => {
        res.status(200).json(movie.Genre);
    })
    .catch((err) => {
        res.status(500).send('Error ' + err);
    });
});

//Return data about a director (bio, birth year, death year) by name
app.get('/movies:/director:/directorName', (req, res) => {
    movies.fineOne({'Director.Name': req.params.directorName})
    .then((movie) => {
        res.status(200).json(movie.Director);
    })
    .catch((err) => {
        res.status(500).send('Error ' + err);
    });
});

//Allow new users to register
app.post('/users', [
    check('Username', 'Username is required').isLength({min:6}),
    check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
],  (req, res) => {
    let errors = validationResults(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let hashedPassword = Users.hashPasswortd(req.body.Password);

    Users.findOne({ Username: req.body.Username })
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + ' already exists');
        } else {
            User 
            .create({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday,
            })
            .then((user) =>{res.status(201).json(user)})
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//Allow users to update their user info (username, password, email, date of birth)
app.put('/users/:Username', (req, res) => {
    if (req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }

    let data = {
        Username: req.body.Username,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
    }
    if (req.body.Password){
        let hashedPassword = Users.hashPassword(req.body.Password);
        data['Password']= hashedPassword;
    }

    Users.findOneAndUpdate({Username: req.paramsUsername},
       {$set: data},
       {new: true})
       .then(updatedUser => {
        res.json(updatedUser);
       })
       .catch(err => {
        console.log(err);
        res.status(500).send('Error ' + err);
       });
});

//Allow users to add a movie to their list of favorites
app.put('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate(
        {Username: req.params.Username},
        {$push: {favoriteMovies: req.params.MovieID}},
        {new:true},
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

//Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate(
        {Username: req.params.Username},
        {$pull: {favoriteMovies: req.params.MovieID}},
        {new:true},
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

//Allow existing users to deregister
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

app.listen(8080, () => console.log ("listening on 8080"))