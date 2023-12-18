const express = require("express");
    http = require('http');
    uuid = require('uuid');
    mongoose = require('mongoose');
    Models = require('./models.js');
    cors = require('cors');

var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

let auth = require('./auth.js')(app);

const passport = require('passport');
require('./passport.js');

const { check, validationResult } = require('express-validator');

mongoose.connect('mongodb://127.0.0.1/cfDB?directConnection=true', { useNewUrlParser: true, useUnifiedTopology: true });

morgan = require('morgan');

const Movies = Models.Movie;
const Users = Models.User;

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors ({
    origin: (origin, callback) => {
            if(!origin) return callback (null, true);
            if(allowedOrigins.indexOf(origin) === -1){ //If a specific origin isn't found on the list of allowed origins
                let message = 'The CORS policy for this application doesn\'t allow acces from origin ' + origin; 
                    return callback(new Error(message ), false);
        }
        return callback(null, true);
    }
}));

let users = [
   {
    name:"Kim Davidson",
    email: "davidson19@gmail.com",
    birthday: ("1974-06-27"),
    favoriteMovies:""
   },
   {
    name:"Joe Smith",
    email: "smith37@gmail.com",
    birthday: ("1985-04-23"),
    favoriteMovies:""
   },
   {
    name:"Jane Doe",
    email: "doe65@gmail.com",
    birthday: ("1954-07-02"),
    favoriteMovies:""
   },
   {
    name:"Bob Johnson",
    email: "johnson43@gmail.com",
    birthday: ("1954-06-06"),
    favoriteMovies:""
   },
   {
    name:"Amy Hill",
    email: "hill89@gmail.com",
    birthday: ("1995-12-16"),
    favoriteMovies: ""
   },
]

let movies = [
    {
        title: "17 Again",
        description: "Mike O'Donnell (Matthew Perry) was a high-school basketball star with a bright future, but he threw it all away to marry his girlfriend and raise their child. Almost 20 years later, Mike'/s marriage has failed, his kids think he'/s a loser, and his job is going nowhere. He gets a chance to correct the mistakes of his past and change his life when he is miraculously transformed into a teenager (Zac Efron), but in trying to fix his past, Mike may be jeopardizing his present and future.",
        genre:  {
            Name: "Comedy",
            Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
        },
        director: {
            Name: "Burr Steers",
            Bio: "Burr Gore Steers is an American actor, screenwriter, and director. His films include Igby Goes Down and 17 Again.",
            Birth:"1965"
        }, 
        ImagePath: "17again.png",
        featured: "True"
    },
    {
        title: "Coraline",
        description: "Wandering her rambling old house in her boring new town, Coraline (Dakota Fanning) discovers a hidden door to a fantasy version of her life. In order to stay in the fantasy, she must make a frighteningly real sacrifice.",
        genre:  {
            Name: "Animation",
            Description: "An animated movie or cartoon, is made up of a series of slightly different drawings of people, animals, and objects that make them appear to move."
        },
        director: {
            Name: "Henry Selick",
            Bio: "Charles Henry Selick Jr. is an American filmmaker and animator. He is best known for directing the stop-motion animated films The Nightmare Before Christmas, James and the Giant Peach, Monkeybone, Coraline, and Wendell & Wild",
            Birth:"1952"
        },
        ImagePath: "coraline.png",
        featured: "True"
    },
    {
        title: "Us",
        description: "The film follows Adelaide Wilson (Nyong'o) and her family, who are attacked by a group of menacing doppelgängers, called the 'Tethered'.",
        genre:  {
            Name: "Horror",
            Description: "A large and heterogeneous group of films that, via the representation of disturbing, violent, and dark subject matter, seek to elicit responses of fear, terror, disgust, shock, suspense, and, of course, horror from their viewers."
        },
        director: {
            Name: "Jordan Peele",
            Bio: "American comedian, writer, director, and producer who was known for creating both comedy and horror films and TV shows that address popular culture and social issues, especially race relations.",
            Birth:"1979"
        },
        ImagePath: "us.png",
        featured: "True"
    },
    {
        title: "Grown Ups",
        description: "The film tells a story of five lifelong friends who won their junior high school basketball championship in 1978. They reunite three decades later for a 4th of July weekend after learning about the sudden death of their basketball coach.",
        genre:  {
            Name: "Comedy",
            Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
        },
        director: {
            Name: "Dennis Dugan",
            Bio: "Dennis Barton Dugan is an American film director, actor, comedian and screenwriter from Wheaton, Illinois who directed several films featuring Adam Sandler including Happy Gilmore, Big Daddy, Jack & Jill, Grown Ups, I Now Pronounce You Chuck & Larry and You Don't Mess With the Zohan.",
            Birth:"1946"
        },
        ImagePath: "grownups.png",
        featured: "True"
    },
    {
        title: "Lilo and Stitch",
        description: "A tale of a young girl's close encounter with the galaxy's most wanted extraterrestrial. Lilo is a lonely Hawaiian girl who adopts a small ugly 'dog,' whom she names Stitch. Stitch would be the perfect pet if he weren't in reality a genetic experiment who has escaped from an alien planet and crash-landed on Earth.",
        genre:  {
            Name: "Animation",
            Description: "An animated movie or cartoon, is made up of a series of slightly different drawings of people, animals, and objects that make them appear to move."
        },
        director: {
            Name: "Chris Sanders",
            Bio: "Christopher Michael Sanders (born March 15, 1960) is an American film animator and voice actor best-known for co-directing and co-writing the Disney animated feature Lilo & Stitch, and providing the voice of Experiment 626 from Lilo & Stitch and Leroy from Disney's Leroy & Stitch.",
            Birth:"1962"
        },
        ImagePath: "liloandstitch.png",
        featured: "True"
    },
    {
        title: "Free Guy",
        description: "In Free Guy, a bank teller who discovers he is actually a background player in an open-world video game, decides to become the hero of his own story... one he rewrites himself. Now in a world where there are no limits, he is determined to be the guy who saves his world his way... before it is too late.",
        genre:  {
            Name: "Comedy",
            Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
        },
        director: {
            Name: "Shawn Levy",
            Bio: "Shawn Adam Levy is a Canadian film director, film producer, screenwriter, actor, and founder of 21 Laps Entertainment. He has worked across genres and is perhaps best known as the director of the Night at the Museum film franchise and primary producer of the Netflix series Stranger Things.",
            Birth:"1968"
        },
        ImagePath: "freeguy.png",
        featured: "True"
    },
    {
        title: "The Green Mile",
        description: "A tale set on death row in a Southern jail, where gentle giant John possesses the mysterious power to heal people's ailments. When the lead guard, Paul, recognizes John's gift, he tries to help stave off the condemned man's execution.",
        genre:  {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        director: {
            Name: "Frank Darabont",
            Bio: "Frank Árpád Darabont is a French-born American filmmaker. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors, The Blob and The Fly II.",
            Birth:"1959"
        },
        ImagePath: "thegreenmile.png",
        featured: "True"
    },
    {
        title: "Lone Survivor",
        description: "Lone Survivor by Marcus Luttrell is an intense and gripping memoir that recounts the harrowing true story of a Navy SEAL mission gone wrong. Luttrell and his team find themselves in a life-or-death struggle against Taliban forces in the mountains of Afghanistan.",
        genre:  {
            Name: "Action",
            Description: "An extremely successful and influential mode of popular cinema that foregrounds spectacular movement of bodies, vehicles and weapons, and state-of-the-art special effects."
        },
        director: {
            Name: "Peter Berg",
            Bio: "Peter Berg is an American actor, director, writer, and producer. His first role was in the Adam Rifkin road movie Never on Tuesday.",
            Birth:"1964"
        },
        ImagePath: "lonesurvivor.png",
        featured: "True"
    },
    {
        title: "The Conjuring",
        description: "In The Conjuring, in the early 1970s, the Perron family -- Roger (Ron Livingston), Carolyn (Lili Taylor), and their five daughters -- move into a new home in the Rhode Island countryside. Before long, they start encountering strange noises and smells, stopped clocks, slamming doors, and figures lurking in dark corners.",
        genre:  {
            Name: "Horror",
            Description: "A large and heterogeneous group of films that, via the representation of disturbing, violent, and dark subject matter, seek to elicit responses of fear, terror, disgust, shock, suspense, and, of course, horror from their viewers."
        },
        director: {
            Name: "Michael Chaves",
            Bio: "Michael Chaves is an American filmmaker and visual effects artist, best known for his work on the miniseries Chase Champion and the theatrical films The Curse of La Llorona, The Conjuring: The Devil Made Me Do It, and The Nun II.",
            Birth:"1984"
        },
        ImagePath: "theconjuring.png",
        featured: "True"
    },
    {
        title: "The Curse of La Llorona",
        description: "In 1970s Los Angeles, the legendary ghost La Llorona is stalking the night -- and the children. Ignoring the eerie warning of a troubled mother, a social worker and her own kids are drawn into a frightening supernatural realm. Their only hope of surviving La Llorona's deadly wrath is a disillusioned priest who practices mysticism to keep evil at bay.",
        genre:  {
            Name: "Horror",
            Description: "A large and heterogeneous group of films that, via the representation of disturbing, violent, and dark subject matter, seek to elicit responses of fear, terror, disgust, shock, suspense, and, of course, horror from their viewers."
        },
        director: {
            Name: "Michael Chaves",
            Bio: "Michael Chaves is an American filmmaker and visual effects artist, best known for his work on the miniseries Chase Champion and the theatrical films The Curse of La Llorona, The Conjuring: The Devil Made Me Do It, and The Nun II.",
            Birth:"1984"
        },
        ImagePath: "thecurseoflallorona.png",
        featured: "True"
    },
]

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

// //Return a list of all movies
// app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     await movies.find()
//     .then((movies) => {
//         res.status(200).json(movies);
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//     });
// });

app.get('/movies', async (req, res) => {
    await movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Return data about a single movie by title
    // app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
    //     movies.findOne({ title: req.params.title })
    //         .then((movie) => {
    //             res.json(movie);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).send('Error: ' + err);
    //         });
    // });

app.get('/movies/:title', (req, res) => {
    movies.findOne({ title: req.params.title })
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// //Return data about a genre description by name
//     app.get('/genre/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
//         genres.findOne({ name: req.params.name })
//         .then((genre) => {
//             res.json(genre.description);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Error: ' + err);
//         })
//     });

app.get('/genre/:name', (req, res) => {
    genres.findOne({ name: req.params.name })
    .then((genre) => {
        res.json(genre.description);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

// //Return data about a director (bio, birth year, death year) by name
//     app.get('/director/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
//         directors.findOne({ name: req.params.name })
//         .then((director) => {
//             res.json(director);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Error: ' + err);
//         });
//     });

app.get('/director/:name', (req, res) => {
    directors.findOne({ name: req.params.name })
    .then((director) => {
        res.json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// //Add a new user
//     app.post('/users', [
//         check('username', 'Username is required').isLength({min: 5}),
//         check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//         check('password', 'Password is required').not().isEmpty(),
//         check('email', 'Email does not appear to be valid').isEmail()
//     ], async (req, res) => {
//         let errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }

//         let hashedPassword = users.hashPassword(req.body.Password);
//         await users.findOne({ username: req.bodyUsername })
//         .then((user) => {
//             if (user) {
//                 return res.status(400).send(req.body.Username + 'already exists');
//             } else {
//                 users
//                     .create({
//                         username: req.body.Username,
//                         password: hashedPassword,
//                         email: req.body.Email,
//                         birthday: req.body.Birthday
//                     })
//                     .then((user) => {res.status(201).json(user) })
//                 .cacth((error) => {
//                     console.error(error);
//                     res.status(500).send('Error: ' + error);
//                 })
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).send('Error: ' + err);
//         });
//     });

    app.post('/users', async (req, res) => {
        await users.findOne({ username: req.bodyUsername })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                users
                    .create({
                        username: req.body.Username,
                        password: req.body.Password,
                        email: req.body.Email,
                        birthday: req.body.Birthday
                    })
                    .then((user) => {
                        res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + err);
        });
    });

// //Get all users
//     app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
//         await users.find()
//             .then((users) => {
//                 res.status(201).json(users);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 res.status(500).send('Error: ' + err);
//             });
//     });

    app.get('/users', async (req, res) => {
        await users.find()
            .then((users) => {
                res.status(201).json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });

// //Get a user by username
//     app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//         await users.findOne({ Username: req.params.Username })
//             .then ((users) => {
//                 res.json(user);
//             })
//             .catch ((err) => {
//                 console.error(err);
//                 res.status(500).send('Error: ' + err);
//             });
//     });

    app.get('/users/:Username', async (req, res) => {
        await users.findOne({ Username: req.params.Username })
            .then ((users) => {
                res.json(user);
            })
        .catch ((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

// //Update a user's info by username
//     app.put('/users/:Username', passport.authenticate('jwt', { session: false }), 
//     [
//         check('Username', 'Username is required').isLength({min: 5}),
//         check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//         check('Password', 'Password is required').not().isEmpty(),
//         check('Email', 'Email does not appear to be valid').isEmail()
//     ], async (req, res) => {
//         let errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         //Condition to check added here
//         if(req.user.Username !== req.params.Username){
//             return res.status(400).send('Permisssion denied')
//         }
//         //Condition ends
//         await users.findOneAndUpdate({ Username: req.params.Username }, {$set:
//         {
//             Username: req.body.Username,
//             Password: req.body.Password,
//             Email: req.body.Email,
//             Birthday: req.body.Birthday
//         }
//         },
//         { new: true})  //This line makes sure that the updated document is returned
//         .then ((updatedUser) => {
//             res.json(updatedUser);
//         }) 
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Error: ' + err);
//         })
//     });

    app.put('/users/:Username', async (req, res) => {
        await users.findOneAndUpdate({ Username: req.params.Username }, {$set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
        },
        { new: true})  //This line makes sure that the updated document is returned
        .then ((updatedUser) => {
            res.json(updatedUser);
        }) 
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
    });


// //Add a movie to a user's list of favorites
//     app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
//         if(req.user.Username !== req.params.Username){
//             return res.status(400).send('Permission denied');
//         }
//         await users.findOneAndUpdate({ Username: req.params.Username}, {
//             $push: { favoriteMovies: req.params.MovieID }
//         },
//         { new: true}) //This line makes sure that the updated document is returned
//         .then((updatedUser) => {
//             res.json(updatedUser);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Error: ' + err);
//         });
//     });
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await users.findOneAndUpdate({ username: req.params.Username}, {
        $push: { favoriteMovies: req.params.MovieID }
    },
    { new: true}) //This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Delete a user by username
// app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     if(req.user.Username !== req.params.Username){
//         return res.status(400).send('Permission denied');
//     }
//     await users.findOneAndUpdate({ Username: req.params.Username })
//     .then((user) => {
//         if (!user) {
//         res.status(400).send(req.params.Username + ' was not found ');
//         } else { 
//             res.status(200).send(req.params.Username + ' was deleted.');
//         }
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//     });
// });

app.delete('/users/:username', (req, res) => {
    users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else { 
            res.status(200).send(req.params.Username + ' was deleted');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// //Allow users to remove a movie from their list of favorites
// app.delete('/users/:Username/movies.MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
//     if(req.user.Username !== req.params.Username){
//         return res.status(400).send('Permission denied');
//     }
//     users.findOneAndUpdate(
//         {Username: req.params.Username},
//         {$pull: {favoriteMovies: req.params.MovieID}},
//         {new:true},
//     )
//     .then((updatedUser) => {
//         res.json(updatedUser);
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//     });
// });

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    users.findOneAndUpdate(
        {Username: req.params.Username},
        {$pull: {favoriteMovies: req.params.MovieID}},
        {new:true},
    )
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});