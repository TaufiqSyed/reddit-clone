import { Router } from 'express'
import { raw } from 'objection'
import tableNames from '../../constants/table-names'
import PostVote from '../votes/post-votes.model'
import Post from './posts.model'
const router = Router()
router.get('/', (req, res) => {
  Post.query()
    .select(
      tableNames.post + '.*',
      Post.relatedQuery('votes')
        .select(raw('coalesce(sum(??), 0)', 'vote_score'))
        .as('upvotes')
    )
    .then(posts => {
      res.status(201).send(posts)
    })
    .catch(err => {
      res.status(400).send(err)
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

router.post('/vote', async (req, res) => {
  let vote_score: number
  let post_id: number
  let user_id: number

  const parseStringToInt = (s: any) => {
    const result = parseInt(s)
    if (isNaN(result)) throw new Error('NaN')
    return result
  }
  try {
    vote_score = parseStringToInt(req.body.vote_score)
    post_id = parseStringToInt(req.body.post_id)
    user_id = parseStringToInt(req.body.user_id)
  } catch (err) {
    return res.sendStatus(400)
  }

  const existsRow = await PostVote.query()
    .select(1)
    .where('post_id', post_id)
    .where('user_id', user_id)
    .first()
  const voteExists = !(existsRow == null)

  try {
    if (voteExists) {
      await PostVote.query()
        .patch({ vote_score })
        .where('post_id', post_id)
        .where('user_id', user_id)
    } else {
      await PostVote.query().insert({ user_id, post_id, vote_score })
    }
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(400)
  }
})

export default router
