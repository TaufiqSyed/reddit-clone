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

router.get('/:id', async (req, res) => {
  try {
    const user = await User.query()
      .select('id', 'username')
      .where('id', req.params.id)
      .first()
    res.send(user)
  } catch (err) {
    res.status(400).send()
  }
  // User.query().then(users => {
  //   res.send(users)
  // })
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const duplicateUser = await User.query().findOne(
    'username',
    req.body.username
  )
  if (duplicateUser) return res.status(400).send('Username already exists')
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
