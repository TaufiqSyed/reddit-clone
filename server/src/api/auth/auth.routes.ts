import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
const router = Router()

// register =>  POST /api/users
// login    =>  POST /api/auth
// logout   =>  DELETE /api/auth

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).send({ authSuccessful: false })
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.status(202).send({ authSuccessful: true })
    })
  })(req, res, next)
})

router.delete('/', (req: Request, res: Response, next: NextFunction) => {
  req.logout()
})

export default router
