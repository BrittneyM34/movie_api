const express = require("express");
    app = express();
    http = require('http');
    uuid = require('uuid');

morgan = require('morgan');

var bodyParser = require('body-parser');

let users = [
   {
    id:1,
    name:"Kim",
    favoriteMovies: []
   },
   {
    id:2,
    name:"Joe",
    favoriteMovies:["Free Guy"]
   }
]

let movies = [
    {
        "title": '17 Again',
        "director": {
            "Name": 'Burr Steers',
            "Bio": "Burr Gore Steers is an American actor, screenwriter, and director. His films include Igby Goes Down and 17 Again.",
        },
        "genre":  {
            "Name": 'Comedy',
            "Description": "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
        },
        "featured": 'Yes',
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

app.use(express.static('public'));

app.use(bodyParser.json());

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
    app.get('/movies/:genre/:genreName', (req, res) => {
        const { genreName }= req.params;
        const genre = movies.find( movie => movie.genre.Name === genreName ).genre;

        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(400).send('No such genre')
        }
    });

//Return data about a director (bio, birth year, death year) by name
    app.get('/movies/:directors/:directorName', (req, res) => {
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
