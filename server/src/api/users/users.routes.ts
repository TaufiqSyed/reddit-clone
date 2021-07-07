import { Router } from 'express'
import User from './users.model'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import { isAdmin } from '../auth/auth-middleware'
const router = Router()

router.get('/', isAdmin, (req, res) => {
  User.query().then(users => {
    res.send(users)
  })
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.query().insert({
      username: req.body.username,
      password: hashedPassword,
      admin: true,
    })
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

export default router
