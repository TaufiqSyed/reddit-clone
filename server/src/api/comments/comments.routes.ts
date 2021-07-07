import { Router } from 'express'
import { isAuth } from '../auth/auth-middleware'
import Comment from './comments.model'
const router = Router()

router.get('/', (req, res) => {
  Comment.query()
    .select('comments.*', 'user.username', 'post.title')
    .leftJoinRelated('[post, user]')
    .then(comments => {
      res.send(JSON.stringify(comments))
    })
    .catch(_err => {
      res.status(500).send()
    })
  return
})

router.post('/', isAuth, (req, res) => {
  const content: string = req.body.content

  const user_id = req.user.id
  let post_id: number
  try {
    post_id = parseInt(req.body.post_id)
  } catch (err) {
    return res.status(400).send()
  }

  Comment.query()
    .insert({ content, user_id, post_id })
    .then(() => {
      res.status(201).send()
    })
    .catch(_err => {
      res.status(400).send()
    })
  return
})

export default router
