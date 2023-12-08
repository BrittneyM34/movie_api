const express = require("express");
    app = express();
    http = require('http');
    uuid = require('uuid');
    mongoose = require('mongoose');
    Models = require('./models.js');

    movies - Models.Movie;
    users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

morgan = require('morgan');

var bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.json());

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

app.get('/movies', (req, res) => {
    res.status(200).
     json(movies);
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
    app.get('/movies/:title', (req, res) => {
        res.json(movies.find((movie) =>
            { return movie.title === req.params.title }));
    });

//Return data about a genre description by name
    app.get('/movies/genre/:genreName', (req, res) => {
        const { genreName }= req.params;
        const genre = movies.find( movie => movie.genre.Name === genreName ).genre;

        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(400).send('No such genre')
        }
    });

//Return data about a director (bio, birth year, death year) by name
    app.get('/movies/directors/:directorName', (req, res) => {
        const { directorName }= req.params;
        const director = movies.find( movie => movie.director.Name === directorName ).director;

        if (director) {
            res.status(200).json(director);
        } else {
            res.status(400).send('No such director')
        }
    });

//Allow new users to register
    app.post('/users', (req, res) => {
        const newUser = req.body;

        if (newUser.name) {
            newUser.id = uuid.v4();
            users.push(newUser);

            res.status(201).json(newUser)
        } else {
            res.status(400).send*('Users need names')
        }
    });

//Allow users to update their user info (username, password, email, date of birth)
    app.put('/users/:id', (req, res) => {
        const { id } = req.params;
        const updatedUser = req.body

        let user = users.find( user => user.id == id);

        if (user) {
            user.name = updatedUser.name;
            res.status(200).json(user);
        } else {
            res.status(400).send('No such user')
        }
    });

//Allow users to add a movie to their list of favorites
    app.post('/users/:id/:movieTitle', (req, res) => {
        const { id, movieTitle } = req.params;

        let user = users.find( user => user.id == id);

        if (user) {
            user.favoriteMovies.push(movieTitle);
            res.status(200).send('${movieTitle} has been added to the user ${id} array');
        } else {
            res.status(400).send('No such user')
        }
    });

//Allow users to remove a movie from their list of favorites

    app.delete('/users/:id/:movieTitle', (req, res) => {
        const { id, movieTitle } = req.params;

        let user = users.find( user => user.id == id);

        if (user) {
            user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
            res.status(200).send('${movieTitle.;} has been deleted from the user ${id} array');
        } else {
            res.status(400).send('No such user')
        }
    });

//Allow existing users to deregister

    app.delete('/users/:id', (req, res) => {
        const { id } = req.params;

        let user = users.find( user => user.id == id);

        if (user) {
            users = users.filter( user => user.id != id);
            res.status(200).send('User ${id} has been deleted');
        } else {
            res.status(400).send('No such user')
        }
    });


// //Return data about a single movie by title
// // app.get('/movies/:Title', (req, res) =>{
//     // movies.findOne({Title: req.params.Title})
//     // .then((movie) => {
//     //     res.status(200).json(movie);
//     // })
//     // .catch((err) => {
//     //     console.error(err);
//     //     res.status(500).send('Error ' + err);
//     // });
// // });

// //Return data about a genre description by name
// app.get('/movies/:genre/:genreName', (req, res) => {
//     genre.findOne({'Genre.Name': req.params.genreName})
//     .then((movie) => {
//         res.status(200).json(movie.Genre);
//     })
//     .catch((err) => {
//         res.status(500).send('Error ' + err);
//     });
// });

// //Return data about a director (bio, birth year, death year) by name
// app.get('/movies/:director/:directorName', (req, res) => {
//     director.findOne({'Director.Name': req.params.directorName})
//     .then((movie) => {
//         res.status(200).json(movie.Director);
//     })
//     .catch((err) => {
//         res.status(500).send('Error ' + err);
//     });
// });

// //Allow new users to register
// app.post('/users', (req, res) => {
//     let newUser = req.body;
  
//     if (!newUser.name) {
//       const message = 'Missing "name" in request body';
//       res.status(400).send(message);
//     } else {
//       newUser.id = uuid.v4();
//       users.push(newUser);
//       res.status(201).send(newUser);
//     }
//   });

// //Allow users to update their user info (username, password, email, date of birth)
// app.put('/users/:Username', (req, res) => {
//     if (req.user.Username !== req.params.Username){
//         return res.status(400).send('Permission denied');
//     }

//     let data = {
//         Username: req.body.Username,
//         Email: req.body.Email,
//         Birthday: req.body.Birthday,
//     }
//     if (req.body.Password){
//         let hashedPassword = Users.hashPassword(req.body.Password);
//         data['Password']= hashedPassword;
//     }

//     Users.findOneAndUpdate({Username: req.paramsUsername},
//        {$set: data},
//        {new: true})
//        .then(updatedUser => {
//         res.json(updatedUser);
//        })
//        .catch(err => {
//         console.log(err);
//         res.status(500).send('Error ' + err);
//        });
// });

// //Allow users to add a movie to their list of favorites
// app.put('/users/:Username/movies/:MovieID', (req, res) => {
//     Users.findOneAndUpdate(
//         {Username: req.params.Username},
//         {$push: {favoriteMovies: req.params.MovieID}},
//         {new:true},
//     )
//     .then(updatedUser => {
//         res.json(updatedUser);
//     })
//     .catch(err => {
//         console.error(err);
//         res.status(500).send('Error ' + err);
//     });
// });


// //Allow users to remove a movie from their list of favorites
// app.delete('/users/:Username/movies/:MovieID', (req, res) => {
//     Users.findOneAndUpdate(
//         {Username: req.params.Username},
//         {$pull: {favoriteMovies: req.params.MovieID}},
//         {new:true},
//     )
//     .then(updatedUser => {
//         res.json(updatedUser);
//     })
//     .catch(err => {
//         console.error(err);
//         res.status(500).send('Error ' + err);
//     });
// });

// //Allow existing users to deregister
// app.delete('/users/:Username', (req, res) => {
//     Users.findOneAndRemove({ Username: req.params.Username})
//     .then((user) => {
//         if (!user) {
//             res.status(400).send(req.params.Username + ' was not found');
//         } else {
//             res.status(200).send(req.params.Username + ' was deleted');
//         }
//     })
//     .catch(err => {
//         console.error(err);
//         res.status(500).send('Error ' + err);
//     });
// });    
