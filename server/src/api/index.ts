import { Router } from 'express'
import usersRouter from './users/users.routes'
import postsRouter from './posts/posts.routes'
import commentsRouter from './comments/comments.routes'
import authRouter from './auth/auth.routes'
const router = Router()

router.use('/users', usersRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)
router.use('/auth', authRouter)

export default router
