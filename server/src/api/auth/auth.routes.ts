import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { isAuth } from './auth-middleware'
const router = Router()

// register =>  POST /api/users
// login    =>  POST /api/auth
// logout   =>  DELETE /api/auth
// isAuth   =>  GET /api/auth
//h

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(200).send({ authSuccessful: false })
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
  res.send()
})

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    res.send({ authSuccessful: true })
  } else {
    res.send({ authSuccessful: false })
  }
})

router.get('/user', (req: any, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.send({
      user: {
        id: req.user.id,
        username: req.user.username,
        admin: req.user.admin,
      },
    })
    // const { password, ...userWithoutPassword } = req.user
    // return res.send(userWithoutPassword)
  } else {
    return res.send({ user: null })
  }
})
export default router
