import { Router } from 'express'
import User from './users.model'
import bcrypt from 'bcrypt'
const router = Router()

router.get('/', (req, res) => {
  User.query()
    .then(users => {
      res.send(JSON.stringify(users))
    })
    .catch(_err => {
      res.status(400).send()
    })
  return
})

router.post('/', (req, res) => {
  const username: string = req.body.username
  const password: string = req.body.password

  User.query()
    .insert({ username, password })
    .then(() => {
      res.status(201).send()
    })
    .catch(_err => {
      res.status(400).send()
    })
  return
})

export default router
