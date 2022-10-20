const passport = require('passport')
const passportJwt = require('passport-jwt')

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const userModel = require('../../model/users')

const config = require('../../config/config')

console.log("I'm outside passport")
module.exports = passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
},
    async (token, done) => {
        console.log("Skyreal is here")
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }

))

