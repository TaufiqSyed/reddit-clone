import { Router } from 'express'
import usersRouter from './users/users.routes'
import postsRouter from './posts/posts.routes'
import commentsRouter from './comments/comments.routes'
const router = Router()

router.use('/users', usersRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

export default router
