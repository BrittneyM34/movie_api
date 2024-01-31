const jwtSecret = 'your_jwt_secret'; //This has to be the same key used in the JWTStrategy
    jwt = require('jsonwebtoken'),
    passport = require ('passport');
    bcrypt = require('bcrypt')

require('./passport'); //Your local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject:user.username, //This is the username you're encoding in the JWT
        expiresIn: '7d', //This specifies that the token will expire in 7 days
        algorithm: 'HS256' //This is the algorithm used to "sign" or encode the values of the JWT
    });
}

// Post login
module.exports = (router) => {
    router.post('/login', async (req, res) => {
        // debug
        console.log('Received login request:', req.body);

        passport.authenticate('local', { session: false }, (error, user, info) => { 
            if (error || !user) {
                console.log('YOU ARE HERE');
                return res.status(400).json({
                    message: 'Login failed',
                    user:user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token})
            });
        })(req, res);
    });
}