import passport from 'passport'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
import connection from './db'
import bcrypt from 'bcrypt'
import User from '../api/users/users.model'

const verifyCallback = async (
  username: string,
  password: string,
  done: any
) => {
  try {
    const user = await User.query().findOne('username', username)
    if (!user) return done(null, false)
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err
      else if (result) return done(null, user)
      else return done(null, false)
    })
  } catch (err) {
    return done(err)
  }
}

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId: number, done) => {
  User.query()
    .findById(userId)
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err))
})
