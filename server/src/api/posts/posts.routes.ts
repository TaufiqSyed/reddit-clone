import { Router } from 'express'
import { raw } from 'objection'
import tableNames from '../../constants/table-names'
import { isAuth } from '../auth/auth-middleware'
import Vote from '../votes/votes.model'
import VoteTarget from '../vote_targets/vote_targets.model'
import Post from './posts.model'

const router = Router()
router.get('/', (req, res) => {
  Post.query()
    .select(tableNames.post + '.*', 'user.username', 'voteTarget.upvotes')
    .leftJoinRelated('[user, voteTarget]')
    // .first()
    .then(posts => {
      res.send(posts)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  return
  // Post.query()
  //   .select(
  //     tableNames.post + '.*',
  //     Post.relatedQuery('votes')
  //       .select(raw('coalesce(sum(??), 0)', 'vote_score'))
  //       .as('upvotes'),
  //     'user.username'
  //   )
  //   .leftJoinRelated('user')
  //   .then(posts => {
  //     res.send(posts)
  //   })
  //   .catch(err => {
  //     res.status(400).send(err)
  //   })
  // return
})

router.get('/:id', (req, res) => {
  // Post.query()
  //   .select(
  //     tableNames.post + '.*',
  //     Post.relatedQuery('votes')
  //       .select(raw('coalesce(sum(??), 0)', 'vote_score'))
  //       .as('upvotes'),
  //     'user.username'
  //   )
  //   .leftJoinRelated('user')
  //   .where(tableNames.post + '.id', req.params.id)
  //   .first()
  //   .then(posts => {
  //     res.send(posts)
  //   })
  //   .catch(err => {
  //     res.status(400).send(err)
  //   })
  Post.query()
    .select(tableNames.post + '.*', 'user.username', 'voteTarget.upvotes')
    .leftJoinRelated('[user, voteTarget]')
    .where(tableNames.post + '.id', req.params.id)
    .first()
    .then(post => {
      res.send(post)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  return
})

router.get('/votes', async (req, res) => {
  try {
    const postVotes = await Vote.query().select()
    res.send(postVotes)
  } catch (err) {
    res.send(500).send()
  }
})

router.post('/', isAuth, async (req, res) => {
  const title: string = req.body.title
  const content: string = req.body.content
  const user_id = req.user.id
  // .then(() => {
  //   res.status(201).send()
  // })
  // .catch(_err => {
  //   res.status(400).send()
  // })

  try {
    const post_id = (
      await VoteTarget.query().insert({ entry_type: 'post' }).returning('id')
    ).id

    await Post.query().insert({ id: post_id, title, content, user_id })
    res.status(201).send()
  } catch (err) {
    res.status(400).send()
  }
  return
})

router.post('/:id/vote', isAuth, async (req, res) => {
  const vote_score = parseInt(req.body.vote_score)
  const post_id = parseInt(req.params.id)
  if (Number.isNaN(vote_score) || Number.isNaN(post_id))
    return res.status(400).send()
  const user_id = req.user.id

  if (vote_score !== 1 && vote_score !== 0 && vote_score !== -1)
    return res.status(400).send()

  try {
    const voteExists =
      (await Vote.query()
        .select(1)
        .where('vote_target_id', post_id)
        .where('user_id', user_id)
        .first()) != null
    if (voteExists) {
      await Vote.query()
        .patch({ vote_score })
        .where('vote_target_id', post_id)
        .where('user_id', user_id)
    } else {
      await Vote.query().insert({
        user_id,
        vote_target_id: post_id,
        vote_score,
      })
    }
    res.sendStatus(202)
  } catch (err) {
    res.sendStatus(400)
  }
})

router.get('/:id/vote', isAuth, async (req, res) => {
  try {
    const data = await Vote.query()
      .where('vote_target_id', req.params.id)
      .where('user_id', req.user.id)
      .first()
    res.send(data)
  } catch (err) {
    res.status(400).send()
  }
})

export default router
