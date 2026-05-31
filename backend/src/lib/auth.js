require("dotenv").config()
const prisma = require("./prisma.js")

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await prisma.user.findUnique({
            where: {
                userId: jwt_payload.sub
            }
        })

        if (!user) {
            return done("User not found", false)
        }

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }))
}