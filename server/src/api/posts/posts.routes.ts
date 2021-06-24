import { Router } from 'express'
import tableNames from '../../constants/table-names'
import Post from './posts.model'
const router = Router()

router.get('/', (req, res) => {
  Post.query()
    // .select(tableNames.post + '.*', 'user.username')
    // .leftJoinRelated('user')
    .then(posts => {
      res.send(JSON.stringify(posts))
    })
    .catch(_err => {
      res.status(500).send()
    })
  return
})

router.post('/', (req, res) => {
  const title: string = req.body.title
  const content: string = req.body.content
  let user_id: number
  try {
    user_id = parseInt(req.body.user_id)
  } catch (err) {
    return res.status(400).send()
  }

  Post.query()
    .insert({ title, content, user_id })
    .then(() => {
      res.status(201).send()
    })
    .catch(_err => {
      res.status(400).send()
    })
  return
})

export default router
