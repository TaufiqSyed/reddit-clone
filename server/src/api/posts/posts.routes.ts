import { Router } from 'express'
import { raw } from 'objection'
import tableNames from '../../constants/table-names'
import { isAuth } from '../auth/auth-middleware'
import PostVote from '../votes/post-votes.model'
import Post from './posts.model'

const router = Router()
router.get('/', (req, res) => {
  Post.query()
    .select(
      tableNames.post + '.*',
      Post.relatedQuery('votes')
        .select(raw('coalesce(sum(??), 0)', 'vote_score'))
        .as('upvotes'),
      'user.username'
    )
    .leftJoinRelated('user')
    .then(posts => {
      res.send(posts)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  return
})

router.get('/:id', (req, res) => {
  // Post.query()
  //   .select(
  //     tableNames.post + '.*',
  //     Post.relatedQuery('votes')
  //       .select(raw('coalesce(sum(??), 0)', 'vote_score'))
  //       .as('upvotes')
  //   )
  //   .where('id', req.params.id)
  //   .first()
  //   .then(posts => {
  //     res.send(posts)
  //   })
  //   .catch(err => {
  //     res.status(400).send(err)
  //   })
  // return

  Post.query()
    .select(
      tableNames.post + '.*',
      Post.relatedQuery('votes')
        .select(raw('coalesce(sum(??), 0)', 'vote_score'))
        .as('upvotes'),
      'user.username'
    )
    .where(tableNames.post + '.id', req.params.id)
    .leftJoinRelated('user')
    .first()
    .then(posts => {
      res.send(posts)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  return
})

router.get('/votes', async (req, res) => {
  try {
    const postVotes = await PostVote.query().select()
    res.send(postVotes)
  } catch (err) {
    res.send(500).send()
  }
})

router.post('/', isAuth, (req: any, res) => {
  const title: string = req.body.title
  const content: string = req.body.content
  const user_id = req.user.id

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

router.post('/:id/vote', isAuth, async (req: any, res) => {
  let vote_score: number
  let post_id: number
  const user_id = req.user.id

  const parseStringToInt = (s: any) => {
    const result = parseInt(s)
    if (isNaN(result)) throw new Error('NaN')
    return result
  }
  try {
    vote_score = parseStringToInt(req.body.vote_score)
    post_id = parseStringToInt(req.params.id)
  } catch (err) {
    return res.status(400).send()
  }

  if (vote_score !== 1 && vote_score !== 0 && vote_score !== -1)
    return res.status(400).send()

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
    res.sendStatus(202)
  } catch (err) {
    res.sendStatus(400)
  }
})

router.get('/:id/vote', isAuth, async (req: any, res) => {
  try {
    const data = await PostVote.query()
      .where('post_id', req.params.id)
      .where('user_id', req.user!.id)
      .first()
    res.send(data)
  } catch (err) {
    res.status(400).send()
  }
})

export default router
