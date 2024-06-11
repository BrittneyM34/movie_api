const express = require('express');
const http = require('http');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const cors = require('cors');
const morgan = require('morgan');

var bodyParser = require('body-parser');
const app = express();

app.use(cors({
    credentials: true,
    allowedOrigins: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// log all incoming requests
app.use(morgan('common'));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

// Mongo DB connection via Mongoose

mongoose.connect(process.env.CONNECTION_URI);

// Local Connection

// mongoose.connect('mongodb://127.0.0.1/cfDB?directConnection=true', { useNewUrlParser: true, useUnifiedTopology: true });

const Movies = Models.Movie;
const Users = Models.User;

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://my-movies-8ed51d856f3e.herokuapp.com/'];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) { //If a specific origin isn't found on the list of allowed origins
//             let message = 'The CORS policy for this application doesn\'t allow acces from origin ' + origin;
//             return callback(new Error(message), false);
//         }
//         return callback(null, true);
//     }
// }));

/** 
 * Home page of the server
 */
app.get('/', (req, res) => {
    res.send('Welcome to my Movie Flix')
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});

/** 
 * Get all movies from the database
 */
app.get('/movies', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await Movies.find()
            .then((movie) => {
                res.status(200).json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });

/** 
 *Return data about a single movie by title
 */
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ title: req.params.title })
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/** 
 * Return data about a genre description by name
*/
app.get('/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "genre.name": req.params.genreName })
        .then((movie) => {
            res.status(200).json(movie.genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/** 
 * Return data about a director (bio, birth year) by name
*/
app.get('/director/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ "director.name": req.params.directorName })
        .then((movie) => {
            res.status(200).json(movie.director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


/** 
 * Add a new user
*/
app.post('/users',
    [
        check('username', 'Username is required').isLength({ min: 5 }),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email does not appear to be valid').isEmail()
    ],
    async (req, res) => {
        // Check the validation object for errors
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.password);
        await Users.findOne({ username: req.body.username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.username + ' already exists');
                } else {
                    Users.create({
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email,
                        birthday: req.body.birthday
                    })
                        .then((user) => {
                            res.status(201).json(user)
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('Error: ' + err);
                        })
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });

/** 
 * Get all users
*/
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/** 
 * Get a user by username
*/
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOne({ username: req.params.Username })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/** 
 * Update a users info by username
*/
app.put('/users/:username', passport.authenticate('jwt', { session: false }),
    [
        check('username', 'Username is required').isLength({ min: 5 }),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('email', 'Email does not appear to be valid').isEmail()
    ],
    async (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(422).json({ errors: errors.array() });
        }
        if (req.user.username !== req.params.username) {
            return res.status(400).send('Permission denied')
        }
        await Users.findOneAndUpdate({ username: req.params.username }, {
            $set:
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                birthday: req.body.birthday
            }
        },
            { new: true })  // This line makes sure that the updated document is returned
            .then((updatedUser) => {
                res.status(200).json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
    });


/** 
 * Add a movie to a user's list of favorites
*/
app.post('/users/:username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username) {
        return res.status(400).send('Permission denied')
    }
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $push: { favoriteMovies: req.params.MovieID }
    },
        { new: true }) // This line makes sure that the updated document is returned
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/** 
 * Allow users to deregister
*/
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username) {
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndDelete({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.username + ' was not found');
            } else {
                res.status(200).send(req.params.username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/** 
 * Allow users to remove a movie from their list of favorites
*/
app.delete('/users/:username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.username !== req.params.username) {
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { favoriteMovies: req.params.MovieID } },
        { new: true },
    )
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});